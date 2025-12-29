import { expect, Locator } from '@playwright/test'

import { BasePage } from '../base-page'
import { faker } from '@faker-js/faker'
import { imageInterior, imageCommonArea, imageFacility } from '@tests-e2e/configurations/image-asset.json'
import { homeAsset, editHomeAsset } from '@tests-e2e/configurations/asset-info.json'
import { assetCode, assetName } from '@tests-e2e/configurations/asset-search.json'

export class SellerPage extends BasePage {
  readonly addAssetButtonLocator: Locator = this.page.locator('span.body-normal.text-white', {
    hasText: 'เพิ่มทรัพย์สิน'
  })
  // icon dropdown กรอกข้อมูล
  readonly sellerInformationLocator: Locator = this.page.locator('p:has-text("ข้อมูลผู้ขาย")')
  readonly projectInformationLocator: Locator = this.page.locator('p:has-text("ข้อมูลโครงการ")')
  readonly sellingPriceLocator: Locator = this.page.locator('p:has-text("ราคาขาย")')
  readonly projectAddressLocator: Locator = this.page.locator('p:has-text("ที่อยู่โครงการ")')

  readonly typeOfSellerLocator: Locator = this.page.locator('button', { hasText: 'เซลล์โครงการ' })
  readonly useProfileUserToSellLocator: Locator = this.page.locator('input[type="checkbox"][value="1"]')
  readonly assetNameThLocator: Locator = this.page.locator('input[placeholder="ระบุชื่อโครงการ (ภาษาไทย)"]')
  readonly typeOfProjectLocator: Locator = this.page.locator('button[name="projecttype"]')
  readonly assetNameENGLocator: Locator = this.page.locator('input[placeholder="ระบุชื่อโครงการ (ภาษาอังกฤษ)"]')
  readonly assetLandSizeLocator: Locator = this.page.locator('#landsize')
  readonly assetAreaSizeLocator: Locator = this.page.locator('#areasize')
  readonly uploadImageAssetLocator: Locator = this.page.locator('button', { hasText: 'อัปโหลดรูปภาพ' })
  readonly houseNumberLocator: Locator = this.page.locator('#housenum')
  readonly numberFloorLocator: Locator = this.page.locator('#num_floor')
  readonly numberBedroomBathroomParkingLocator: Locator = this.page.locator(
    'button.request_property_plus_minus:has-text("+")'
  )
  readonly desiredSellingPriceLocator: Locator = this.page.locator('#pricesold')
  readonly realPriceLocator: Locator = this.page.locator('#actualloanprice')
  readonly bankPriceLocator: Locator = this.page.locator('#contractpricebank')
  readonly specifyTheAddressNumberLocator: Locator = this.page.locator('#projecthousenum')
  readonly provinceLocator: Locator = this.page.locator('#province_id')
  readonly districtsLocator: Locator = this.page.locator('#districts_id')
  readonly subDistrictLocator: Locator = this.page.locator('#subdistricts_id')
  readonly fillGoogleMap: Locator = this.page.locator('#google_map')
  readonly furnitureLocator: Locator = this.page.locator('p:has-text("เฟอร์นิเจอร์")')
  readonly projectPostCode: Locator = this.page.locator('input[id="projectpostcode"]')
  readonly buttonConfirmLocator: Locator = this.page.locator('button:has-text("ส่งข้อมูลให้จัซแมทซ์")')
  readonly brandDevelopLocator: Locator = this.page.locator('#brand_id')
  readonly viewAssetButtonLocator: Locator = this.page.locator('button:has-text("ดูทรัพย์สินของฉัน")')
  readonly viewAssetLocator: Locator = this.page.locator('a[href="/my/seller/property"]').first()

  readonly searchForRentalPurchaseLocator: Locator = this.page.locator('button:has-text("ค้นหาเพื่อเช่าซื้อ")')
  readonly searchBarLocator: Locator = this.page.locator('input[placeholder="ค้นหาจากชื่อโครงการ ทำเล หรือรหัสทรัพย์"]')

  readonly houseIdLocator: Locator = this.page.locator('a[href^="/propertydetail/24211"]')
  readonly houseName: Locator = this.page.locator('.title-sm.text-txt-brand.leading-tight.mb-2')

  readonly searchHouseNameLocator: Locator = this.page.locator('a[href^="/propertydetail/24255"]')
  readonly detailOfNewHouseLocator: Locator = this.page.locator('table.table-seller-property-list tbody tr').first()
  readonly detailOfNameHouseLocator: Locator = this.page.locator('h2.title-xl.text-txt-brand')
  readonly detailOfPriceHouseLocator: Locator = this.page.locator('div.seller_screen h2.title').first()
  readonly detailOfAddressHouseLocator: Locator = this.page.locator('p.footnote.text-txt-tertiary-on-light')
  readonly statusOfHouseLocator: Locator = this.page.locator('td.stage_text-body', { hasText: 'รออนุมัติ' })
  readonly rowStatusHouseLocator: Locator = this.page.locator('.table-seller-property-list').first()

  readonly editAssetHouseLocator: Locator = this.page.locator('button', { hasText: 'แก้ไข' })
  readonly editBrandDevelopLocator: Locator = this.page.locator('.ant-select-selection-item')
  readonly editDistrictsLocator: Locator = this.page.locator('.ant-select-selection-item').nth(3)
  readonly buttonConfirmEditLocator: Locator = this.page.locator('button:has-text("ส่งข้อมูลให้จัซแมทช์")')

  async sellerAddSellerInformation() {
    await this.addAssetButtonLocator.click()
    await this.sellerInformationLocator.click()
    await this.typeOfSellerLocator.click()
    await this.useProfileUserToSellLocator.check()
  }
  async addProjectInformation() {
    await this.projectInformationLocator.click()
    const projectName =
      homeAsset.projectName +
      ` ${faker.word.sample()} ${faker.number.int({
        min: 1,
        max: 999
      })}`
    await this.assetNameThLocator.click()
    await this.assetNameThLocator.fill(projectName)
    await this.assetNameENGLocator.fill(projectName)
    await this.typeOfProjectLocator.nth(0).click()
    await this.assetLandSizeLocator.fill(homeAsset.assetLandSize)
    await this.assetAreaSizeLocator.fill(homeAsset.assetAreaSize)

    // ใส่รูป
    const [fileChooser] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetLocator.nth(0).click()
    ])
    await fileChooser.setFiles(imageInterior.interior1)

    const [fileChooser1] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetLocator.nth(1).click()
    ])
    await fileChooser1.setFiles(imageCommonArea.commonArea)

    const [fileChooser2] = await Promise.all([
      this.page.waitForEvent('filechooser'),
      this.uploadImageAssetLocator.nth(2).click()
    ])
    await fileChooser2.setFiles(imageFacility.facility)

    await this.houseNumberLocator.fill(homeAsset.houseNumber)
    await this.numberFloorLocator.fill(homeAsset.numberFloor)
    await this.numberBedroomBathroomParkingLocator.nth(0).click()
    await this.numberBedroomBathroomParkingLocator.nth(1).click()
    await this.numberBedroomBathroomParkingLocator.nth(2).click()
    await this.brandDevelopLocator.click()
    await this.page.getByText(homeAsset.brandDevelop).click()
  }
  async addSellingPrice() {
    await this.sellingPriceLocator.click()
    await this.desiredSellingPriceLocator.fill(homeAsset.desiredSellingPrice)
    await this.realPriceLocator.fill(homeAsset.realPriceLocator)
    await this.bankPriceLocator.fill(homeAsset.bankPrice)
  }
  async addAddressProject() {
    await this.projectAddressLocator.click()
    await this.specifyTheAddressNumberLocator.fill(homeAsset.specifyTheAddressNumber)
    await this.provinceLocator.click()
    await this.page.getByText(homeAsset.province).click()
    await this.districtsLocator.click()
    await this.page.getByText(homeAsset.districts).click()
    await this.subDistrictLocator.click()
    await this.page.getByText(homeAsset.subDistrict).click()
    await this.projectPostCode.fill(homeAsset.postCode)
    await this.fillGoogleMap.fill(homeAsset.googleMap)
  }
  async addFurniture() {
    await this.furnitureLocator.click()
    await this.page.getByText(homeAsset.furniture).click()
    await this.furnitureLocator.nth(0).click()
  }
  async confirmAddNewProject() {
    await this.buttonConfirmLocator.click()
  }
  async viewNewAsset() {
    await this.viewAssetButtonLocator.click()
  }

  async sellerAddSellerInformationNoData() {
    await this.addAssetButtonLocator.click()
    await this.projectInformationLocator.click()
    await this.sellingPriceLocator.click()
    await this.projectAddressLocator.click()
    await this.furnitureLocator.click()
  }
  async sellerViewAsset() {
    await this.viewAssetLocator.click()
    if ((await this.rowStatusHouseLocator.count()) > 0) {
      await expect(this.statusOfHouseLocator).toHaveText('รออนุมัติ')
    }
    await this.detailOfNewHouseLocator.click()
    await expect(this.detailOfPriceHouseLocator).toHaveText('4,000,000 บาท')
    await expect(this.detailOfAddressHouseLocator).toHaveText('725/23 เสนานิคม จตุจักร กรุงเทพมหานคร 10900')
  }

  async sellerViewAssetByAnnounceCode() {
    await this.searchForRentalPurchaseLocator.click()
    await this.searchBarLocator.click()
    await this.searchBarLocator.fill(assetCode.announcementCode)
  }

  async sellerViewAssetByHouseName() {
    await this.searchForRentalPurchaseLocator.click()
    await this.searchBarLocator.click()
    await this.searchBarLocator.fill(assetName.searchHouseName)
  }

  async editProjectInformation() {
    await this.viewAssetLocator.click()
    await this.detailOfNewHouseLocator.click()
    await this.editAssetHouseLocator.click()
    await this.projectInformationLocator.click()
    await this.assetLandSizeLocator.clear()
    await this.assetLandSizeLocator.fill(editHomeAsset.assetLandSize)
    await this.assetAreaSizeLocator.clear()
    await this.assetAreaSizeLocator.fill(editHomeAsset.assetAreaSize)
    await this.houseNumberLocator.clear()
    await this.houseNumberLocator.fill(editHomeAsset.houseNumber)
    await this.numberFloorLocator.clear()
    await this.numberFloorLocator.fill(editHomeAsset.numberFloor)
    await this.editBrandDevelopLocator.nth(0).click()
    await this.page.getByText(editHomeAsset.brandDevelop).click()
  }

  async editSellingPrice() {
    await this.sellingPriceLocator.click()
    await this.desiredSellingPriceLocator.clear()
    await this.desiredSellingPriceLocator.fill(editHomeAsset.desiredSellingPrice)
    await this.realPriceLocator.clear()
    await this.realPriceLocator.fill(editHomeAsset.realPriceLocator)
    await this.bankPriceLocator.clear()
    await this.bankPriceLocator.fill(editHomeAsset.bankPrice)
  }

  async editAddressProject() {
    await this.projectAddressLocator.click()
    await this.specifyTheAddressNumberLocator.clear()
    await this.specifyTheAddressNumberLocator.fill(editHomeAsset.specifyTheAddressNumber)
    await this.editDistrictsLocator.click()
    await this.page.getByText(editHomeAsset.districts).click()
    await this.subDistrictLocator.click()
    await this.page.getByText(editHomeAsset.subDistrict).click()
    await this.projectPostCode.clear()
    await this.projectPostCode.fill(editHomeAsset.postCode)
    await this.fillGoogleMap.clear()
    await this.fillGoogleMap.fill(editHomeAsset.googleMap)
  }

  async editFurniture() {
    await this.furnitureLocator.click()
    await this.page.getByText(editHomeAsset.furniture).click()
  }
  async confirmEditNewProject() {
    await this.buttonConfirmEditLocator.nth(1).click()
  }
  async viewEditNewAsset() {
    await this.viewAssetButtonLocator.click()
  }
}
