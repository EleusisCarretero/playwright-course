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
        const saveAddressFields = [
            "saved-address-firstName",
            "saved-address-lastName",
            "saved-address-street",
            "saved-address-postcode",
            "saved-address-city",
            "saved-address-country",
        ]
        // initialize input fields
        inputUserFields.forEach(inputAttribute => {
            let tmpNewAttribute = inputAttribute.replace(" ", "").toLowerCase();
            this[tmpNewAttribute] = this.page.getByRole("textbox",{name: inputAttribute} )
        });
        // initalize save data fields
        saveAddressFields.forEach(savedAttributes => {
            let tmpsavedAttributes = savedAttributes.replace(/-/g, "").toLowerCase();
            this[tmpsavedAttributes] = this.page.locator(`[data-qa='${savedAttributes}']`);
        });
        this.countryDropDown =  this.page.locator("[data-qa='country-dropdown']")
        this.saveAddressForNextTimeButton = this.page.getByRole("button",{name: "Save address for next time"})
        this.continueToPaymentButton = this.page.getByRole("button",{name: "Continue to payment"})
        this.saveAddressContainer = this.page.locator("[data-qa='saved-address-container']")
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

    saveUserDetails = async (newUserData) => {
        await this.saveAddressForNextTimeButton.waitFor();
        await this.saveAddressForNextTimeButton.click();
        await this.saveAddressContainer.waitFor();
        for (let key of Object.keys(newUserData)){
            let completeKey ="savedaddress" +  key;
            let userData = newUserData[key];
            await this[completeKey].waitFor();
            let textContent = await this[completeKey].textContent();
            await expect(userData).toEqual(textContent);
            // await this.page.waitForTimeout(10);
        }
        await this.page.waitForTimeout(1000);
    }

    continueToPayment = async() => {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await this.page.waitForTimeout(1000);
    }
   
}