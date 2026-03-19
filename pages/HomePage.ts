import { Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page

    // locator
    readonly sidebarMenuNames: Locator

    constructor(page: Page) {
        this.page = page
        this.sidebarMenuNames = page.locator("//span[@class='oxd-text oxd-text--span oxd-main-menu-item--name'")
    }

    // get list sidebar menu name
    async getSidebarMenuNames(): Promise<string[]> {
        const count = await this.sidebarMenuNames.count()

        const menuNames: string[] = []
        for(let i = 0; i < count; i++) {
            const name = await this.sidebarMenuNames.nth(i).textContent()
            if(name) {
                menuNames.push(name.trim())
            }
        }
        return menuNames
    }
}