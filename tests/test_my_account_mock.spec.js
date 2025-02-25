import { test, expect} from "@playwright/test"
import {MyAcountPage} from "../page-objects/myAcountPage.js"
import { adminDetails } from "../data/userDetails.js"

test.only("Testing my acount using mock netwotking request", async ({page})=>{
    const myAccountPage =  new MyAcountPage(page);
    const loginToken = await myAccountPage.getLoginToken(adminDetails.username, adminDetails.password);
    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "PLAYWRIGHT ERROR FROM MOCKING"}),
        })
    })
    await myAccountPage.openPage();
    await page.evaluate(([loginTokenInsideBrowserCode]) => {
        document.cookie = "token=" + loginTokenInsideBrowserCode
    }, [loginToken])
    await page.pause();
    await myAccountPage.openPage();
    await myAccountPage.waitForPageHeading();
    await myAccountPage.waitForErrorMessage();

});