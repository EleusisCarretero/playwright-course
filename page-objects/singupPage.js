import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class SigupPage extends BaseProduct{

    constructor(page){
        super(page)
        this.eMail = this.page.getByRole("textbox",{name: "E-mail"} )
        this.password = this.page.getByRole("textbox",{name: "Password"} )
        this.registerButton = this.page.getByRole("button", {name: "Register"})
    }

    fillupNewUser = async(newUserCredentials) => {
        // 0. check email 
        expect(newUserCredentials["eMail"]).toMatch(/^[\w.-]+@[\w.-]+\.[a-z]{2,}$/)
        // 1. fill email
        await this.eMail.waitFor();
        await this.eMail.fill(newUserCredentials["eMail"])
        await expect(this.eMail).toHaveValue(newUserCredentials["eMail"])
        // 2. fill password
        await this.password.waitFor();
        await this.password.fill(newUserCredentials["password"])
        await expect(this.password).toHaveValue(newUserCredentials["password"])

    }

    registerNewUser = async() => {
        await this.registerButton.waitFor();
        await expect(this.registerButton).toHaveText("Register");
        await specificButton.click();
    }
    
}