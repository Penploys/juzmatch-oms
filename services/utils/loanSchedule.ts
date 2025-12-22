export type LoanInput = {
  contractPrice: number;          // ราคาหน้าสัญญา
  downPaymentPaid: number;        // จ่ายเงินดาวน์ที่ลูกค้าจ่าย(รวมเงินจอง)
  monthlyPayment: number;         // เงินจ่ายรายเดือน
  firstInstallmentStartDate: Date; // วันเริ่มค่างวด (งวดที่ 1 due = วันนี้)
  annualInterestRate: number;     // ดอกเบี้ย Annual 
  numInstallments?: number;       // default 37
  waveInstallmentsYes?: number[]; // ระบุเฉพาะงวดที่ Wave = Yes [1,5,9] เริ่มที่ 0 => งวดที่ 1
  currentDate?: Date; 
  penaltyRate?: number;            // อัตราดอกเบี้ยผิดนัด 
};

export type InstallmentRow = {
  installmentNo: number;
  dueDate: Date;

  // งวด 1 เท่านั้น
  firstMonthDaysToPay?: number;
  firstMonthDaysInMonth?: number;
  ratio?: number;

  minimumPayment: number;           // จำนวนเงินขั้นต่ำที่ต้องจ่าย
  interest: number;                 // ดอกเบี้ยปกติ

  // เพิ่มตามข้อ 5-9
  principal: number;                // 5) เงินต้น = minPay - interest
  remainingPrincipalBefore: number; 
  remainingPrincipalAfter: number;  // 6) เงินต้นคงเหลือ = prevRemain - principal

  daysLate: number;                 // ใช้คำนวณ penalty
  lateInterest: number;             // 7) ดอกเบี้ยผิดนัดชำระ
  accruedInterest: number;          // 8) ดอกเบี้ยค้างชำระ = interest + lateInterest
  fee: number;                      // 9) ค่าธรรมเนียม
};

function daysInMonth(d: Date): number {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}

function toMidday(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
}

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function moneyFloor(n: number): number {
  return Math.floor(n);
}

function addMonthsKeepDay(d: Date, months: number): Date {
  const y = d.getFullYear();
  const m = d.getMonth() + months;
  const day = d.getDate();
  const target = new Date(y, m, 1, 12, 0, 0, 0);
  const dim = daysInMonth(target);
  return new Date(target.getFullYear(), target.getMonth(), Math.min(day, dim), 12, 0, 0, 0);
}

function buildWaveYesSet(waveYes: number[] | undefined): Set<number> {
  return new Set((waveYes ?? []).filter(n => Number.isInteger(n) && n > 0));
}

/**
 * งวดที่ 1: due = วันเริ่มค่างวด
 * งวดที่ 2..n: due = วันที่ 5 ของ “เดือนถัดไปเรื่อย ๆ”
 * ตัวอย่าง: start 14/12/2025
 *  - งวด1: 14/12/2025
 *  - งวด2: 05/01/2026
 *  - งวด3: 05/02/2026 ...
 */
export function generateDueDates(startDate: Date, numInstallments: number): Date[] {
  const start = toMidday(startDate);
  const dates: Date[] = [start];

  // งวด 2 เป็นต้นไป: 5 ของเดือนถัดไปจาก "เดือน start"
  const baseYear = start.getFullYear();
  const baseMonth = start.getMonth(); // 0-based

  for (let i = 2; i <= numInstallments; i++) {
    const mOffset = i - 1; // งวด2 => +1 เดือน, งวด3 => +2 เดือน ...
    const d = new Date(baseYear, baseMonth + mOffset, 5, 12, 0, 0, 0);
    dates.push(d);
  }

  return dates;
}


// diff เป็น “จำนวนวัน” แบบตัดเวลา (ใช้ midday กัน timezone shift)
export function diffDays(from: Date, to: Date): number {
  const a = toMidday(from).getTime();
  const b = toMidday(to).getTime();
  const ms = a - b;
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}

function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

export function daysInYear(d: Date): number {
  return isLeapYear(d.getFullYear()) ? 366 : 365;
}


/**
 * คำนวณ schedule ตาม requirement:
 * 1) daysToPayFirstMonth, daysInFirstMonth จาก firstInstallmentStartDate
 * 2) due date 37 งวด
 * 3) minimumPayment: งวด1 prorate, งวด2+ = monthlyPayment
 * 4) interest:
 *   - งวด1 = (annual/12) * contractPrice * ratio
 *   - งวด2+ = (annual/12) * remainingPrincipal(prev)
 *
 * หมายเหตุ: เพื่อให้มี remaining principal ใช้งาน
 *  - เงินต้นเริ่มต้น = contractPrice - downPaymentPaid
 *  - เงินต้นลดลง = max(minimumPayment - interest, 0)
 */
export function buildInstallmentSchedule(input: LoanInput): InstallmentRow[] {
  const n = input.numInstallments ?? 37;

  const waveYesSet = buildWaveYesSet(input.waveInstallmentsYes);

  const monthlyRate = input.annualInterestRate / 12;

  const start = toMidday(input.firstInstallmentStartDate);
  const dim = daysInMonth(start);
  const startDay = start.getDate();
  const daysToPayFirstMonth = dim - startDay + 1; // inclusive
  const ratio = daysToPayFirstMonth / dim;

  const dueDates = generateDueDates(start, n);
  
  const currentDate = input.currentDate ? toMidday(input.currentDate) : toMidday(new Date());
  const penaltyRate = input.penaltyRate ?? 0.075;

  // เงินต้นตั้งต้น
  let remainingPrincipal = input.contractPrice;
  if (remainingPrincipal < 0) remainingPrincipal = 0;

  const rows: InstallmentRow[] = [];

  for (let i = 1; i <= n; i++) {
    const dueDate = dueDates[i - 1];
    const remainingPrincipalBefore = round2(Math.max(remainingPrincipal, 0));  
     
    const waveFlag = waveYesSet.has(i);

    // 3) min pay = จำนวนเงินขั้นต่ำที่ต้องจ่าย
    const minimumPayment =
      i === 1 ? round2(ratio * input.monthlyPayment) : round2(input.monthlyPayment);
    
    // 4) interest = ดอกเบี้ย
    const interest =
      i === 1
        ? moneyFloor(monthlyRate * input.contractPrice * ratio)
        : moneyFloor(monthlyRate * remainingPrincipal);



    // 5) principal = เงินต้น
    const principal = round2(Math.max(minimumPayment - interest, 0));

    // 6) remaining principal after = เงินต้นคงเหลือ
    // 6) remaining before - principal
    const remainingPrincipalAfter = round2(remainingPrincipalBefore - principal);

    // 7) late interest = ดอกเบี้ยผิดนัดชำระ
    const daysLate = Math.max(diffDays(currentDate, dueDate), 0);
    const yearDays = daysInYear(currentDate);
    const lateInterest = round2(
      daysLate > 0 ? (minimumPayment * daysLate * penaltyRate) / yearDays : 0
    );

    // 8) accrued interest = ดอกเบี้ยค้างชำระ
    const accruedInterest = 
      waveFlag ? round2(interest + lateInterest) // Wave = Yes
      : round2(interest);                        // Wave = No


    // 9) fee = ค่าธรรมเนียม
    const fee = 
      waveFlag && lateInterest > 0
      ? 50
      : 0;

    rows.push({
      installmentNo: i,
      dueDate,
      ...(i === 1
        ? {
            firstMonthDaysToPay: daysToPayFirstMonth,
            firstMonthDaysInMonth: dim,
            ratio: round2(ratio),
          }
        : {}),
      minimumPayment,
      interest,
      principal,
      remainingPrincipalBefore,
      remainingPrincipalAfter,
      daysLate,
      lateInterest,
      accruedInterest,
      fee,
    });
  }

  return rows;
}
