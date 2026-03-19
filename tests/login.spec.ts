import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CsvRow, readCsv } from "./utils/readCsv";

// describe: define group các test case liên quan với nhau
test.describe("Login tests", () => {
    test("Test login thành công", async ({page}) => {
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        await loginPage.isLoginSuccessfull()
    })
})

test.describe("Login test with data provider", () => {
    // đọc data từ file csv
    const loginDatas: CsvRow[] = readCsv("data/login_data.csv")
    // LƯU Ý: tạo test case dựa trên lượng data trong file csv
    // dùng loop để tạo số lượng test case tránh trùng title test case
    for (const testData of loginDatas) {
        // tạo title cho từng test case
        const title = `Login with username=${testData.username} => ${testData.expectedResult}`
        test(title, async ({page}) => {
            const loginPage = new LoginPage(page)

            await loginPage.login(testData.username, testData.password)

            // dựa vào expectedResult trong csv để kiểm tra pass/fail
            if(testData.expectedResult === 'success') {
                await loginPage.isLoginSuccessfull()
            } else {
                await expect(await loginPage.isLoginSuccessfull()).toBe(false)
            }
        })
    }
})

// allure playwright: plugin giup tao bao cao allure cho test case
// allure-commandline: plugin giup xem bao cao allure tren local sau khi test case chay xong
