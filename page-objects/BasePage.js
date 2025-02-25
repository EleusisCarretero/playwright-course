import * as nodeFetch from "node-fetch"

export class BaseProduct {
    constructor(page){
        this.page = page
    }

    openPage = async (timeout=2000) => {
        await this.page.goto("/")
        await this.page.waitForTimeout(timeout);
    }

    getLoginToken = async (username, password) => {
        console.log("Credentials: username ", username, "password: ", password)
        const response = await nodeFetch("http://localhost:2221/api/login", {
            method: "POST",
            body: JSON.stringify({"username":username,"password":password}),
            })
        if (response.status !== 200){
            throw new Error("An error occured trying to retrieve the login token.");
        }
        const body = await response.json();
        console.log("Body info: ", body)
        console.log("Token: ",  body.token)
        return body.token;
    }
}