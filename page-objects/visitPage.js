import { BaseProduct } from "./BasePage";

export class VisitPage extends BaseProduct{
    constructor(page){
        super(page)
        this.mobileNavigation = this.page.locator("[data-qa='mobile-navication']");
        this.checkout = this.page.getByRole("link", {name: "Checkout"});
        this.__basketCounter__ = this.page.locator("[data-qa='header-basket-count']");
        

    }

    goToCheckout = async () => {
        await this.checkout.waitFor();
        await this.checkout.click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForURL("/basket")
    }

    get basketCounter() {
        return (async () => {
            await this.__basketCounter__.waitFor()
            let basketCountText = await this.__basketCounter__.innerText();
            return parseInt(basketCountText, 10)
        })();
    }
}