import { Locator, Page } from "@playwright/test";
import { join } from "node:path";

export class MyInfoPage {
    readonly page: Page

    // locator
    readonly avatarWrapper: Locator
    readonly uploadBtn: Locator
    readonly fileInput: Locator

    constructor(page: Page) {
        this.page = page

        this.avatarWrapper = page.locator("//div[@class='orangehrm-edit-employee-image-wrapper']")
        // this.uploadBtn = page.locator("//button[@class='oxd-icon-button oxd-icon-button--solid-main employee-image-action']")
        this.uploadBtn = page.locator("button.employee-image-action")
        this.fileInput = page.locator("input[type='file']")
    }

    async uploadAvatar(): Promise<void> {
        // B1: Click vào avatar để mở menu
        await this.avatarWrapper.waitFor({state: 'visible', timeout: 20000})
        await this.avatarWrapper.click()

        // B2: Click vào nút Upload
        await this.uploadBtn.waitFor({state: 'visible', timeout: 20000})
        await this.uploadBtn.click()

        // B3: upload file hình
        const filePath = join(__dirname, "..", "tests", "data", "testing11.jpg")
        await this.fileInput.setInputFiles(filePath)
        await this.page.waitForTimeout(5000) // chờ 5s để upload file xong
    }
}