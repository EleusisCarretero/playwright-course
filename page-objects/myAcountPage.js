import { BaseProduct } from "./BasePage";
import { expect } from "@playwright/test";


export class MyAcountPage extends BaseProduct{

    constructor(page){
        super(page)
        this.__eMail__ =  this.page.getByText("Email").textContent();
        this.__userId__ =  this.page.getByText("User ID").textContent();
    }

    get eMail (){
        return this.__eMail__;
    }

    get userId(){
        return this.__userId__;
    }

   
    
}