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
            this[tmpNewAttribute] = this.page.getByRole("textbox",{name: inputAttribute} )
        });
        this.countryDropDown =  this.page.locator("[data-qa='country-dropdown']")
        this.saveAddressForNextTimeButton = this.page.getByRole("button",{name: "Save address for next time"})
        this.continueToPaymentButton = this.page.getByRole("button",{name: "Continue to payment"})
    }

    fillUserDetails = async(newUserData) => {
        // Fill all the new user data
        let country = newUserData.country;
        for (let key of Object.keys(newUserData)){
            if (key != "country"){
                let userData = newUserData[key];
                console.log("User data: ", userData);
                await this[key].waitFor();
                await this[key].fill(userData);
                await expect(this[key]).toHaveValue(userData);
                await this.page.waitForTimeout(500);
            }
        }
        // Dropdown country
        await this.countryDropDown.waitFor();
        await this.countryDropDown.selectOption(country);


    }

   

   
    
}