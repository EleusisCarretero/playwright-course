import { BaseProduct } from "./BasePage";

export class ProductPage extends BaseProduct{
    constructor(page){
        super(page)
        this.addButtons = this.page.locator("[data-qa='product-button']");
        this.totalProductsAvailable = async ()=>{
            return await this.addButtons.count();
        }
        this.ProductsAdded = 0;
    }
    addProductToBasket = async (index) => {
        await this.addButtons.nth(index).waitFor()
        await this.addButtons.nth(index).click()
        this.ProductsAdded ++
        this.totalProductsAvailable = this.totalProductsAvailable - this.ProductsAdded
    }

    addManyProductsToBasketInOrder = async (numProducts) => {
        while(this.ProductsAdded < numProducts){
            await this.addProductToBasket(this.ProductsAdded)
            await this.page.waitForTimeout(2000);
        }
    }

}