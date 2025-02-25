import { test, expect} from "@playwright/test"
import {MyAcountPage} from "../page-objects/myAcountPage"

test.only("Testing my acount", async ({page})=>{
    const myAccountPage =  new MyAcountPage(page);
    const loginToken = await myAccountPage.getLoginToken();
    await myAccountPage.openPage();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    // await page.pause();
    await myAccountPage.openPage();
    
    // await myAccountPage.waitForPageHeading();
    // await myAccountPage.waitForErrorMessage();
    // await page.pause();


});