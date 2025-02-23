import { expect } from "@playwright/test";
import { BaseProduct } from "./BasePage";
import { VisitPage } from "./visitPage";

export class ProductPage extends BaseProduct{
    constructor(page){
        super(page)
        this.addButtons = this.page.locator("[data-qa='product-button']");
        this.totalProductsAvailable = async ()=>{
            return await this.addButtons.count();
        }
        this.currentIndx = 0;
        this.visitPage = new VisitPage(page)
    }
    addProductToBasket = async (index) => {
        const specificButton = this.addButtons.nth(index);
        await specificButton.waitFor();
        await expect(specificButton).toHaveText("Add to Basket");
        const basketCountBefore =  await this.visitPage.basketCounter;
        await specificButton.click();
        await expect(specificButton).toHaveText("Remove from Basket");
        const basketCountAfter =  await this.visitPage.basketCounter;
        expect(basketCountAfter).toBeGreaterThan(basketCountBefore);
    }

    goToCheckoutPage = () => {
        this.visitPage.goToCheckout()
    }

}