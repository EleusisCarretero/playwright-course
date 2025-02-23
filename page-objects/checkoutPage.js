import { BaseProduct } from "./BasePage";


export class CheckoutPage extends BaseProduct{

    constructor(page){
        super(page)
        this.basketCards = this.page.locator("[data-qa='basket-card']");
        this.basketItemPrice = this.page.locator("[data-qa='basket-item-price']");
        this.basketItemRemoveButton = this.page.locator("[data-qa='basket-card-remove-item']")

    }
    removeCheapestProduct =  async () => {
        await this.basketCards.first().waitFor();
        await this.basketItemPrice.first().waitFor();
        const allPricesText =  await this.basketItemPrice.allInnerText();
        console.log({allPricesText})
    }
}