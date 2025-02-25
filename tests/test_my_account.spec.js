import { test, expect} from "@playwright/test"
import {MyAcountPage} from "../page-objects/myAcountPage"
import { adminDetails } from "./../data/userDetails.js"

test.skip("Testing my acount", async ({page})=>{
    const myAccountPage =  new MyAcountPage(page);

    const loginToken = await myAccountPage.getLoginToken(adminDetails.username, adminDetails.password);
    await myAccountPage.openPage();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await myAccountPage.openPage();
});