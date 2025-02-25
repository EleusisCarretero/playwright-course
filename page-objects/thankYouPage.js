import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class ThankYouPage extends BaseProduct{

    constructor(page){
        super(page)
       
        this.backToShopButton = this.page.getByRole('button', { name: 'Back to shop' });
    }

    backToShop = async() => {
        await this.backToShopButton.waitFor({ state: "attached", timeout: 10000 });
        await this.backToShopButton.waitFor({ state: "visible", timeout: 10000 });
        await this.backToShopButton.click();
        await this.page.waitForURL("/");
    }
    
}