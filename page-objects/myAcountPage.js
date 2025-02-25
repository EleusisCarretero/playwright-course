import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class MyAcountPage extends BaseProduct{

    constructor(page){
        super(page)
        this.pageHeading = this.page.getByRole('heading', { name: 'My Account' });
        this.errorMessage = this.page.locator('[data-qa="error-message"]');
    }
    openPage = async (timeout=2000) => {
        await this.page.goto("/my-account")
        await this.page.waitForTimeout(timeout);
    }

    waitForPageHeading = async () => {
        await this.pageHeading.waitFor();
    }

    waitForErrorMessage = async () => {
        await this.errorMessage.waitFor();
    }
   
}