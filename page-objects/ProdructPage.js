import { expect } from "@playwright/test";
import { BaseProduct } from "./BasePage";
import { VisitPage } from "./visitPage";


const sortingBy = {
    cheapeast: "price-asc",
    expensivest: "price-asc",
}

export class ProductPage extends BaseProduct{
    constructor(page){
        super(page)
        this.addButtons = this.page.locator("[data-qa='product-button']");
        this.totalProductsAvailable = async ()=>{
            return await this.addButtons.count();
        }
        this.currentIndx = 0;
        this.visitPage = new VisitPage(page)
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
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

    goToCheckoutPage = async() => {
        await this.visitPage.goToCheckout()
    }

    sortBy = async (sortby = sortingBy.cheapeast) => {
        await this.sortDropdown.waitFor();
        await this.productTitle.first().waitFor();
        const productTitlesBeforeSorting = await this.productTitle.allInnerTexts();
        await this.sortDropdown.selectOption(sortby)
        const productTitlesAfterSorting = await this.productTitle.allInnerTexts()
        expect(productTitlesAfterSorting).not.toEqual(productTitlesBeforeSorting)

    }

}