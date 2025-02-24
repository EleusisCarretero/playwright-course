import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class LoginPage extends BaseProduct{

    constructor(page){
        super(page)
        this.loginButton = this.page.getByRole("button", {name: "Login"})
        this.eMail = this.page.getByRole("textbox",{name: "E-mail"} )
        this.password = this.page.getByRole("textbox",{name: "Password"} )
        this.registerButton = this.page.getByRole("button", {name: "Register"})
    }

    moveToRegisterPage = async() => {
        await this.registerButton.waitFor();
        await expect(this.registerButton).toHaveText("Register");
        await this.registerButton.click();
        await this.page.waitForTimeout(1000);
        await this.page.waitForURL(/\/signup/)
    }
    
}