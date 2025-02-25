import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class PaymentPage extends BaseProduct{

    constructor(page){
        super(page)
        const paymentData = [
            "credit-card-owner",
            "credit-card-number",
            "valid-until",
            "credit-card-cvc",
           
        ]
        // initalize save data fields
        paymentData.forEach(paymentAttributes => {
            let tmppaymentAttributes = paymentAttributes.replace(/-/g, "").toLowerCase();
            this[tmppaymentAttributes] = this.page.locator(`[data-qa='${paymentAttributes}']`);
        });
        this.submitDiscountButton = this.page.getByRole("button",{name: "Submit discount"});
        this.payButton = this.page.locator("[data-qa='pay-button']");
        // this element is an iframe, so we need a special type of locator
        this.discountCode = this.page.frameLocator("[data-qa='active-discount-container']").locator("[data-qa='discount-code']");
        this.discountCodeInput = this.page.getByRole("textbox",{name: "Discount code"});
        this.totalToPaywithoutDiscount = this.page.locator("[data-qa='total-value']");
        this.totalToPaywithDiscount = this.page.locator("[data-qa='total-with-discount-value']");
       
    }
    fillPaymentMethod = async (paymentMethodData) => {
        for (let key of Object.keys(paymentMethodData)){
            let paymentData = paymentMethodData[key];
            await this[key].waitFor();
            await this[key].fill(paymentData);
            await expect(this[key]).toHaveValue(paymentData);
        }

    }
    submitDiscount = async () =>{
        // Read total without discount
        await this.totalToPaywithoutDiscount.waitFor();
        const totalWithoutDiscount = await this.totalToPaywithoutDiscount.innerText();
        // read the discount code
        await this.discountCode.waitFor();
        const discount = await this.discountCode.innerText();
        // fill discount code
        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.fill(discount);
        // verify it was filled
        await expect(this.discountCodeInput).toHaveValue(discount);
        // submit discount
        await this.submitDiscountButton.waitFor();
        await this.submitDiscountButton.click();
        // get price with discount
        await this.totalToPaywithDiscount.waitFor();
        const totalWithDiscount = await this.totalToPaywithDiscount.innerText();
        await expect(parseInt(totalWithDiscount.replace("$", ""))).toBeLessThan(parseInt(totalWithoutDiscount.replace("$", "")));
    }

    pay = async() => {
        await this.payButton.waitFor();
        await this.payButton.click();
        await this.page.waitForURL(/\/thank-you/, { timeout: 3000 });
    }
    
}