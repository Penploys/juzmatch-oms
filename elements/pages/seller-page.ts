import { expect, Locator } from '@playwright/test'

import { BasePage } from '../base-page'
import { faker } from '@faker-js/faker'
import { imageInterior, imageCommonArea, imageFacility } from '@tests-e2e/configurations/image-asset.json'
import { homeAsset, editHomeAsset } from '@tests-e2e/configurations/asset-info.json'

export class SellerPage extends BasePage {
  readonly addAssetButtonLocator: Locator = this.page.locator('span.body-normal.text-white', {
    hasText: 'เพิ่มทรัพย์สิน'
  })
  // icon dropdown กรอกข้อมูล
  readonly sellerInformationDropDownLocator: Locator = this.page.locator('p:has-text("ข้อมูลผู้ขาย")')
  readonly projectInformationDropDownLocator: Locator = this.page.locator('p:has-text("ข้อมูลโครงการ")')
  readonly sellingPriceDropDownLocator: Locator = this.page.locator('p:has-text("ราคาขาย")')
  readonly projectAddressDropDownLocator: Locator = this.page.locator('p:has-text("ที่อยู่โครงการ")')
  readonly typeOfSellerButtonLocator: Locator = this.page.locator('button', { hasText: 'เซลล์โครงการ' })
  readonly useProfileUserToSellCheckBoxLocator: Locator = this.page.locator('input[type="checkbox"][value="1"]')
  readonly assetNameThInputLocator: Locator = this.page.locator('input[placeholder="ระบุชื่อโครงการ (ภาษาไทย)"]')
  readonly typeOfProjectButtonLocator: Locator = this.page.locator('button[name="projecttype"]')
  readonly assetNameENGInputLocator: Locator = this.page.locator('input[placeholder="ระบุชื่อโครงการ (ภาษาอังกฤษ)"]')
  readonly assetLandSizeInputLocator: Locator = this.page.locator('#landsize')
  readonly assetAreaSizeInputLocator: Locator = this.page.locator('#areasize')
  readonly uploadImageAssetButtonLocator: Locator = this.page.locator('button', { hasText: 'อัปโหลดรูปภาพ' })
  readonly houseNumberInputLocator: Locator = this.page.locator('#housenum')
  readonly numberFloorInputLocator: Locator = this.page.locator('#num_floor')
  readonly numberBedroomBathroomParkingButtonLocator: Locator = this.page.locator(
    'button.request_property_plus_minus:has-text("+")'
  )
  readonly desiredSellingPriceInputLocator: Locator = this.page.locator('#pricesold')
  readonly realPriceInputLocator: Locator = this.page.locator('#actualloanprice')
  readonly bankPriceInputLocator: Locator = this.page.locator('#contractpricebank')
  readonly specifyTheAddressNumberInputLocator: Locator = this.page.locator('#projecthousenum')
  readonly provinceInputLocator: Locator = this.page.locator('#province_id')
  readonly districtsInputLocator: Locator = this.page.locator('#districts_id')
  readonly subDistrictInputLocator: Locator = this.page.locator('#subdistricts_id')
  readonly googleMapInputLocator: Locator = this.page.locator('#google_map')
  readonly furnitureDropdownLocator: Locator = this.page.locator('.ant-collapse-header:has-text("เฟอร์นิเจอร์")')
  readonly editFurnitureButtonLocator: Locator = this.page.locator('button[name="furniture_type"]')
  readonly projectPostCodeInputLocator: Locator = this.page.locator('input[id="projectpostcode"]')
  readonly buttonConfirmLocator: Locator = this.page.locator('button:has-text("ส่งข้อมูลให้จัซแมทซ์")')
  readonly brandDevelopDropdownLocator: Locator = this.page.locator('#brand_id')
  readonly viewAssetButtonLocator: Locator = this.page.locator('button:has-text("ดูทรัพย์สินของฉัน")')
  readonly propertiesForSaleSideBarLocator: Locator = this.page.locator('a[href="/my/seller/property"]').first()
  readonly searchForRentalPurchaseButtonLocator: Locator = this.page.locator('button:has-text("ค้นหาเพื่อเช่าซื้อ")')
  readonly searchBarInputLocator: Locator = this.page.locator(
    'input[placeholder="ค้นหาจากชื่อโครงการ ทำเล หรือรหัสทรัพย์"]'
  )
  readonly detailOfNewHouseTableListCardLocator: Locator = this.page
    .locator('table.table-seller-property-list tbody tr')
    .first()
  readonly detailOfPriceHouseLocator: Locator = this.page.locator('div.seller_screen h2.title').first()
  readonly detailOfAddressHouseLocator: Locator = this.page.locator('p.footnote.text-txt-tertiary-on-light')
  readonly statusOfHouseButtonLocator: Locator = this.page.locator('td.stage_text-body', { hasText: 'รออนุมัติ' })
  readonly rowStatusHouseTableLocator: Locator = this.page.locator('.table-seller-property-list').first()
  readonly editAssetHouseButtonLocator: Locator = this.page.locator('button', { hasText: 'แก้ไข' })
  readonly editBrandDevelopDropDownLocator: Locator = this.page.locator('.ant-select-selection-item').nth(0)
  readonly editBrandDevelopInputLocator: Locator = this.page.locator('.ant-select-item-option-content')
  readonly editDistrictsDropdownLocator: Locator = this.page.locator('.ant-select-selection-search-input').nth(3)
  readonly editDistrictsInputLocator: Locator = this.page.locator('.ant-select-item-option-content')
  readonly confirmEditButtonLocator: Locator = this.page.locator('button:has-text("ส่งข้อมูลให้จัซแมทช์")')
  readonly assetDetailCardLocator: Locator = this.page.locator('div.sc-ggWZvA.hcTUKX h2.title-sm')
  readonly assetHouseIdLocator: Locator = this.page.locator('a[href="/propertydetail/24211"]')
  readonly houseNameH2CardLocator: Locator = this.page.locator('.title-sm.text-txt-brand.leading-tight.mb-2')
  readonly housePriceCardLocator: Locator = this.page.locator(
    'div.label.font-bold.text-txt-primary-on-light.mb-2.border-t.pt-2'
  )
  readonly houseAddressCardLocator: Locator = this.page.locator('div.sc-fhHczv.dtlniB')
  readonly editSpecifyTheAddressNumberInputLocator: Locator = this.page
    .locator('div.form-field', {
      hasText: 'เลขที่อยู่/ถนน/ซอย'
    })
    .locator('input')
  readonly editProvinceDropdownLocator: Locator = this.page.locator('.ant-select-selection-item').nth(2)
  readonly editProvinceInputLocator: Locator = this.page.locator('.ant-select-item-option-content')
  readonly editSubDistrictInputLocator: Locator = this.page.locator('#subdistricts_id')
  readonly validationErrorLocator: Locator = this.page.locator('.invalid-feedback')

  readonly inFormationOfSellerDropDownLocator: Locator = this.page.locator('flex justify-between').nth(0)
  readonly sellerFullNameInputLocator: Locator = this.page.locator('#sellerfullname')
  readonly sellerTelephoneNumberInputLocator: Locator = this.page.locator('#sellertel')
  readonly latitudeInputLocator: Locator = this.page.locator('#latitude')
  readonly longitudeInputLocator: Locator = this.page.locator('#longitude')

  async sellerAddSellerInformation() {
    await this.addAssetButtonLocator.click()
    await this.sellerInformationDropDownLocator.click()
    await this.typeOfSellerButtonLocator.click()
    await this.useProfileUserToSellCheckBoxLocator.check()
  }
  async addProjectInformation() {
    await this.projectInformationDropDownLocator.click()
    const projectName =
      homeAsset.projectName +
      ` ${faker.word.sample()} ${faker.number.int({
        min: 1,
        max: 999
      })}`
    await this.assetNameThInputLocator.click()
    await this.assetNameThInputLocator.fill(projectName)
    await this.assetNameENGInputLocator.fill(projectName)
    await this.typeOfProjectButtonLocator.nth(0).click()
    await this.assetLandSizeInputLocator.fill(homeAsset.assetLandSize)
    await this.assetAreaSizeInputLocator.fill(homeAsset.assetAreaSize)

    // ใส่รูป
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetButtonLocator.nth(0).click()
    ])
    await fileChooser.setFiles(imageInterior.interior1)

    const [fileChooser1] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetButtonLocator.nth(1).click()
    ])
    await fileChooser1.setFiles(imageCommonArea.commonArea)

    const [fileChooser2] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetButtonLocator.nth(2).click()
    ])
    await fileChooser2.setFiles(imageFacility.facility)

    await this.houseNumberInputLocator.fill(homeAsset.houseNumber)
    await this.numberFloorInputLocator.fill(homeAsset.numberFloor)
    await this.numberBedroomBathroomParkingButtonLocator.nth(0).click()
    await this.numberBedroomBathroomParkingButtonLocator.nth(1).click()
    await this.numberBedroomBathroomParkingButtonLocator.nth(2).click()
    await this.brandDevelopDropdownLocator.click()
    await this.page.getByText(homeAsset.brandDevelop).click()
  }
  async addSellingPrice() {
    await this.sellingPriceDropDownLocator.click()
    await this.desiredSellingPriceInputLocator.fill(homeAsset.desiredSellingPrice)
    await this.realPriceInputLocator.fill(homeAsset.realPriceLocator)
    await this.bankPriceInputLocator.fill(homeAsset.bankPrice)
  }
  async addAddressProject() {
    await this.projectAddressDropDownLocator.click()
    await this.specifyTheAddressNumberInputLocator.fill(homeAsset.specifyTheAddressNumber)
    await this.provinceInputLocator.click()
    await this.page.getByText(homeAsset.province).click()
    await this.districtsInputLocator.click()
    await this.page.getByText(homeAsset.districts).click()
    await this.subDistrictInputLocator.click()
    await this.page.getByText(homeAsset.subDistrict).click()
    await this.projectPostCodeInputLocator.fill(homeAsset.postCode)
    await this.googleMapInputLocator.fill(homeAsset.googleMap)
  }
  async addFurniture() {
    await this.furnitureDropdownLocator.click()
    await this.page.getByText(homeAsset.furniture).click()
    await this.furnitureDropdownLocator.nth(0).click()
  }
  async confirmAddNewProject() {
    await this.buttonConfirmLocator.click()
  }
  async viewNewAsset() {
    await this.viewAssetButtonLocator.click()
  }

  async SellerAddNewAssetNoData() {
    await this.addAssetButtonLocator.click()
    await this.sellerInformationDropDownLocator.click()
    await this.buttonConfirmLocator.click()

    await expect(this.validationErrorLocator.nth(0)).toHaveText('กรุณาระบุ ประเภทผู้ขาย')
    await expect(this.validationErrorLocator.nth(1)).toHaveText('กรุณาระบุ ชื่อผู้ขาย')
    await expect(this.validationErrorLocator.nth(2)).toHaveText('กรุณาระบุ เบอร์โทรศัพท์ผู้ขาย')
    await expect(this.validationErrorLocator.nth(3)).toHaveText('กรุณาระบุ ชื่อโครงการ (ภาษาไทย)')
    await expect(this.validationErrorLocator.nth(4)).toHaveText('กรุณาระบุ ชื่อโครงการ (ภาษาอังกฤษ)')
    await expect(this.validationErrorLocator.nth(5)).toHaveText('กรุณาระบุ ขนาดที่ดิน')
    await expect(this.validationErrorLocator.nth(6)).toHaveText('กรุณาระบุ พื้นที่ใช้สอย')
    await expect(this.validationErrorLocator.nth(7)).toHaveText('กรุณาอัพโหลดรูปภาพ ภาพห้อง และบรรยากาศภายใน')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ เลขที่บ้าน/เลขที่ห้อง/รหัสแปลง')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ จำนวนชั้น')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ จำนวนห้องนอน')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ ผู้พัตนาโครงการ')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ ราคาที่ต้องการขาย')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ ราคาประเมินที่กู้ได้จริง')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ ราคาหน้าสัญญายื่นธนาคาร')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ เลขที่อยู่/ถนน/ซอย')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ จังหวัด')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ เขต/อำเภอ')
    await expect(this.validationErrorLocator).toHaveText('ตำบล/แขวง')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ รหัสไปรษณีย์')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุละติจูด')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุลองจิจูด')
    await expect(this.validationErrorLocator).toHaveText('กรุณาระบุ เฟอร์นิเจอร์')
  }

  async sellerViewAsset() {
    await this.propertiesForSaleSideBarLocator.click()
    if ((await this.rowStatusHouseTableLocator.count()) > 0) {
      await expect(this.statusOfHouseButtonLocator).toHaveText('รออนุมัติ')
    }
    await this.detailOfNewHouseTableListCardLocator.click()
    await expect(this.detailOfPriceHouseLocator).toHaveText('4,000,000 บาท')
    await expect(this.detailOfAddressHouseLocator).toHaveText('725/23 เสนานิคม จตุจักร กรุงเทพมหานคร 10900')
  }

  async sellerViewAssetByAnnounceCode(params: {
    announcementCode: string
    houseName: string
    price: string
    address: string
  }) {
    const { announcementCode, houseName, price, address } = params

    await this.searchForRentalPurchaseButtonLocator.click()
    await this.searchBarInputLocator.click()
    await this.searchBarInputLocator.fill(announcementCode)

    await expect(this.assetHouseIdLocator).toHaveCount(1)

    if ((await this.assetHouseIdLocator.count()) > 0) {
      await expect(this.houseNameH2CardLocator).toHaveText(houseName)
      await expect(this.housePriceCardLocator).toHaveText(price)
      await expect(this.houseAddressCardLocator).toHaveText(address)
    }
  }

  async sellerViewAssetByHouseName(params: {
    announcementCode: string
    houseName: string
    price: string
    address: string
  }) {
    const { announcementCode, houseName, price, address } = params

    await this.searchForRentalPurchaseButtonLocator.click()
    await this.searchBarInputLocator.click()
    await this.searchBarInputLocator.fill(announcementCode)

    if ((await this.assetHouseIdLocator.count()) > 0) {
      await expect(this.houseNameH2CardLocator).toHaveText(houseName)
      await expect(this.housePriceCardLocator).toHaveText(price)
      await expect(this.houseAddressCardLocator).toHaveText(address)
    }
  }

  async editProjectInformation() {
    await this.propertiesForSaleSideBarLocator.click()
    await this.detailOfNewHouseTableListCardLocator.click()
    await this.editAssetHouseButtonLocator.click()
    await this.page.waitForTimeout(5_000)
    await this.projectInformationDropDownLocator.click()
    await this.assetNameThInputLocator.click()
    await this.assetNameThInputLocator.fill(editHomeAsset.projectName)
    await this.assetLandSizeInputLocator.clear()
    await this.assetLandSizeInputLocator.fill(editHomeAsset.assetLandSize)
    await this.assetAreaSizeInputLocator.clear()
    await this.assetAreaSizeInputLocator.fill(editHomeAsset.assetAreaSize)
    await this.houseNumberInputLocator.clear()
    await this.houseNumberInputLocator.fill(editHomeAsset.houseNumber)
    await this.numberFloorInputLocator.clear()
    await this.numberFloorInputLocator.fill(editHomeAsset.numberFloor)
    await this.page.waitForTimeout(5000)
    await this.editBrandDevelopDropDownLocator.click()
    await this.editBrandDevelopInputLocator.getByText(editHomeAsset.editBrandDevelop).click()
  }

  async editSellingPrice() {
    await this.sellingPriceDropDownLocator.click()
    await this.desiredSellingPriceInputLocator.clear()
    await this.desiredSellingPriceInputLocator.fill(editHomeAsset.desiredSellingPrice)
    await this.realPriceInputLocator.clear()
    await this.realPriceInputLocator.fill(editHomeAsset.realPriceLocator)
    await this.bankPriceInputLocator.clear()
    await this.bankPriceInputLocator.fill(editHomeAsset.bankPrice)
  }

  async editAddressProject() {
    await this.projectAddressDropDownLocator.click()
    await this.editSpecifyTheAddressNumberInputLocator.clear()
    await this.editSpecifyTheAddressNumberInputLocator.fill(editHomeAsset.editSpecifyTheAddressNumber)
    await this.editProvinceDropdownLocator.click()
    await this.editProvinceInputLocator.getByText(editHomeAsset.editProvince).click()
    await this.editDistrictsDropdownLocator.click()
    await this.editDistrictsInputLocator.getByText(editHomeAsset.editDistricts).click()
    await this.editSubDistrictInputLocator.click()
    await this.page.getByText(editHomeAsset.editSubDistrict).click()
    await this.projectPostCodeInputLocator.clear()
    await this.projectPostCodeInputLocator.fill(editHomeAsset.editPostCode)
  }

  async editFurniture() {
    await this.furnitureDropdownLocator.click()
    await this.page.getByText(editHomeAsset.editFurniture).waitFor({ state: 'visible' })
    await this.page.getByText(editHomeAsset.editFurniture).click()
  }
  async confirmEditNewProject() {
    await this.confirmEditButtonLocator.nth(1).click()
  }

  async viewEditNewAsset(params: { announcementCode: string; houseName: string; price: string; address: string }) {
    const { houseName, price, address } = params

    await this.viewAssetButtonLocator.click()

    if ((await this.assetHouseIdLocator.count()) > 0) {
      await expect(this.houseNameH2CardLocator).toHaveText(houseName)
      console.log(houseName)
      await expect(this.housePriceCardLocator).toHaveText(price)
      console.log(price)
      await expect(this.houseAddressCardLocator).toHaveText(address)
      console.log(address)
    }
  }
}
