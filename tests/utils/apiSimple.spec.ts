import {expect, test} from '@playwright/test'


const BASE_URL = "https://movienew.cybersoft.edu.vn"
const TOKEN_CYBERSOFT = process.env.TOKEN_CYBERSOFT

test.describe("API Simple Test", () => {
    // request: là đối tượng được Playwright cung cấp để thực hiện các yêu cầu HTTP
    test("GET list users", async ({request}) => {
        const url = `${BASE_URL}/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01`

        // gọi api bằng phương thức GET
        const response = await request.get(url, {
            headers: {
                accept: "application/json",
                TokenCybersoft: TOKEN_CYBERSOFT
            }
        })

        // kiểm tra response API
        // case 1: status code phải là 200
        expect(response.status(), "API Get list user should be 200").toBe(200)

        // case 2: parse response body thành JSON
        const responseBody = await response.json()
        // mong đợi kiểu dữ liệu của response là array
        expect(Array.isArray(responseBody.content), "Response body should be an array").toBe(true)

        // số lượng user trả về phải lớn hơn 0
        expect(responseBody.content.length, "Number of users should be greater than 0").toBeGreaterThan(0)

        // case 3: kiểm tra một số trường dữ liệu của user đầu tiên trong danh sách
        const firstUser = responseBody.content[0]
        expect(firstUser).toHaveProperty("taiKhoan")
        expect(firstUser).toHaveProperty("email")
        expect(firstUser).toHaveProperty("soDT")
        expect(firstUser).toHaveProperty("maLoaiNguoiDung")
        expect(firstUser).toHaveProperty("hoTen")
    })
})