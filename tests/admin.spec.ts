
import test, { expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { HomePage } from '../pages/HomePage'
import { AdminPage } from '../pages/AdminPage'
import { highlightStep } from './utils/highlightStep'

test.describe("TC: Admin page test", () =>{
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
console.log("đã đến bước này")
console.log(process.env.USERNAME!, process.env.PASSWORD!)
        await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!)

console.log("mk:" + process.env.USERNAME!, process.env.PASSWORD!)
        // await loginPage.isLoginSuccessfull()

        const homePage = new HomePage(page)
        await page.waitForURL("**/dashboard**", {timeout: 30000})
        await homePage.clickMenuAdmin()
    })

    test("TC1: Filter admin user", async ({page}) => {
        const adminPage = new AdminPage(page)

        await highlightStep(page, adminPage.usernameInput)
        await adminPage.filterAdminUser("Admin")

        await highlightStep(page, adminPage.userRoleSelect)
        await adminPage.selectAdminRole()

        await highlightStep(page, adminPage.searchButton)
        await adminPage.clickSearchButton()

        await adminPage.waitForLoadingSpinnerToDisappear()

        // verify kết quả filter ra đúng user Admin
        const rowCount = await adminPage.countRows()
        expect(rowCount).toBeGreaterThan(0)

        // expect(true).toBeTruthy()
    })
})