import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class DeliveryDetailsPage extends BaseProduct{

    constructor(page){
        super(page)
        const inputUserFields = [
            "First name",
            "Last name",
            "Street",
            "Post code",
            "City"
        ];
        inputUserFields.forEach(inputAttribute => {
            let tmpNewAttribute = inputAttribute.replace(" ", "").toLowerCase();
            console.log("New attribute: ", tmpNewAttribute);
            this[tmpNewAttribute] = this.page.getByRole("textbox",{name: inputAttribute} )
        });
        this.saveAddressForNextTimeButton = this.page.getByRole("button",{name: "Save address for next time"})
        this.continueToPaymentButton = this.page.getByRole("button",{name: "Continue to payment"})
    }

    saveAddressForNextTime = async(newUserData) => {
        // 1. First name
        for (let key of Object.keys(newUserData)){
            let userData = newUserData[key];
            console.log("User data: ", userData);
            await this[key].waitFor();
            await this[key].fill(userData);
            await expect(this[key]).toHaveValue(userData);
            await this.page.waitForTimeout(500);
        }

    }

   

   
    
}