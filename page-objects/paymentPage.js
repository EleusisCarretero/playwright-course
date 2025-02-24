import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class PaymentPage extends BaseProduct{

    constructor(page){
        super(page)
        const saveAddressFields = [
            "credit-card-owner",
            "credit-card-number",
            "valid-until",
            "credit-card-cv",
           
        ]
        // initalize save data fields
        saveAddressFields.forEach(savedAttributes => {
            let tmpsavedAttributes = savedAttributes.replace(/-/g, "").toLowerCase();
            this[tmpsavedAttributes] = this.page.locator(`[data-qa='${savedAttributes}']`);
        });
        this.submitDiscountButton = this.page.getByRole("button",{name: "Submit discount"});
        this.payButton = this.page.getByRole("button",{name: "Pay"});
        this.discountCode = this.page.locator("[data-qa='discount-code']");
       
    }

    
}