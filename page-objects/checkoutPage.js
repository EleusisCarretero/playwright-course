import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class CheckoutPage extends BaseProduct{

    constructor(page){
        super(page)
        this.basketCards = this.page.locator("[data-qa='basket-card']");
        this.basketItemPrice = this.page.locator("[data-qa='basket-item-price']");
        this.basketItemRemoveButton = this.page.locator("[data-qa='basket-card-remove-item']")

    }
    removeCheapestProduct =  async () => {
        await this.basketCards.first().waitFor();
        const itemsBeforeRemoval =  await this.basketCards.count()
        await this.basketItemPrice.first().waitFor();
        const allPricesText =  await this.basketItemPrice.allInnerTexts();
        // get just number value
        const justNumbers = allPricesText.map((element) => {
            console.warn({element})
            return parseFloat(element.replace("$",""))
        })
        console.warn({justNumbers})
        const smallestPrice = Math.min(justNumbers);
        const smallestPriceIdx = justNumbers.indexOf(smallestPrice);
        const specificRemoveButton = this.basketItemRemoveButton.nth(smallestPriceIdx);
        await specificRemoveButton.waitFor();
        await specificRemoveButton.click();
        await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1);
    }
}