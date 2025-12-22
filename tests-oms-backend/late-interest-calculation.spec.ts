
import { test, expect } from '@playwright/test';
import { buildInstallmentSchedule } from '../services/utils/loanSchedule';

function fmt(d: Date): string {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}


test('Loan schedule - 37 installments (first prorate, due dates, min pay, interest)', async () => {
  const input = {
    contractPrice: 2625000,                 // ราคาหน้าสัญญา
    downPaymentPaid: 365000,                 // ดาวน์รวมเงินจอง
    monthlyPayment: 15750,                   // จ่ายรายเดือน
    firstInstallmentStartDate: new Date('2025-09-20'), // 14/12/2025 
    annualInterestRate: 0.0495,                // 7.5% ต่อปี
    numInstallments: 37,
    penaltyRate: 0.075,                     // ดอกเบี้ยผิดนัด 7.5% ต่อปี
    waveInstallmentsYes: [0, 3],            // เริ่มที่ 0 => งวดที่ 1
  };

  const rows = buildInstallmentSchedule(input);

  const installmentNo1 = rows[0]; // งวด 1
  const installmentNo2 = rows[1]; // งวด 2
  const installmentNo3 = rows[2]; // งวด 3
  const installmentNo4 = rows[3]; // งวด 4
  const installmentNo5 = rows[4]; // งวด 5
  const installmentNo37 = rows[36]; // งวด 5  

  expect(rows).toHaveLength(37);

  // งวดที่ 1
  expect(fmt(installmentNo1.dueDate)).toBe('20/09/2025');
  expect(installmentNo1.minimumPayment).toBe(5775);
  expect(installmentNo1.interest).toBe(3970);
  expect(installmentNo1.principal).toBe(1805);
  expect(installmentNo1.remainingPrincipalAfter).toBe(2623195);
  expect(installmentNo1.fee).toBe(0);
  expect(installmentNo1.lateInterest).toBe(106.8);
  expect(installmentNo1.accruedInterest).toBeCloseTo(3970);  
  expect(installmentNo1.daysLate).toBe(90);

  // งวดที่ 2
  expect(fmt(installmentNo1.dueDate)).toBe('05/10/2025');
  expect(installmentNo1.minimumPayment).toBe(15750);
  expect(installmentNo1.interest).toBe(10821);
  expect(installmentNo1.principal).toBe(4929);
  expect(installmentNo1.remainingPrincipalAfter).toBe(2618266);
  expect(installmentNo1.fee).toBe(50);
  expect(installmentNo1.lateInterest).toBe(106.8);
  expect(installmentNo1.accruedInterest).toBeCloseTo(3970);  
  expect(installmentNo1.daysLate).toBe(90);

});