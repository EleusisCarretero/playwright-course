import { test, expect} from "@playwright/test"
import { ProductPage, sortingBy } from "../page-objects/ProdructPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { LoginPage } from "../page-objects/loginPage";
import { SigupPage } from "../page-objects/singupPage";
import { MyAcountPage } from "../page-objects/myAcountPage";
import {v4 as uuidv4} from 'uuid';
import {DeliveryDetailsPage} from "../page-objects/deliveryDetailsPage"

test.only("Product Page Add To Masket", async ({page})=>{

    //1. Create page products instances
    const idexItemsToAdd = [1, 2, 4];
    const productPage =  new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SigupPage(page);
    const loginPage = new LoginPage(page);
    // const myAcountPage = new MyAcountPage(page);
    const deliveryDetailsPage = new DeliveryDetailsPage(page);
    const emailId = uuidv4();
    const password = uuidv4();
    const newUserCredentials = {
        "eMail": emailId + "@kittymail.com",
        "password": password
    }
    const newUserData = {
        "firstname": "Kalcifer",
        "lastname": "Carretero",
        "street": "Rayon",
        "postcode": "45180",
        "city": "Zapopan",
        "country": "Mexico",
    }
    await productPage.openPage();

    // 2. Sorting elements
    await productPage.sortBy(sortingBy.mostExpensive);
    await page.waitForTimeout(50);
    

    // 3. Add the products
    for (const index of idexItemsToAdd){
        productPage.addProductToBasket(index);
        await page.waitForTimeout(2000);
    }

    // await Promise.all(
    //     idexItemsToAdd.map(async (index) => {
    //         await productPage.addProductToBasket(index);
    //         await page.waitForTimeout(2000);
    //     })
    // );

    // 4. Go to checkout
    await productPage.goToCheckoutPage();

    // 5. Remove item
    await checkoutPage.removeCheapestProduct();

    // 6. Continue to Checkout
    await checkoutPage.continueToCheckout();
    await page.waitForTimeout(100);

    // 7. Register a new user
    await loginPage.moveToRegisterPage();
    await page.waitForTimeout(300);

    // 8. Input new user credentials
    await signupPage.fillupNewUser(newUserCredentials);
    await page.waitForTimeout(1000);

    //9. register the new user
    await signupPage.registerNewUser();
    await page.waitForTimeout(1000);

    // // 10. Compare the user registered vs the given data
    // const currentEmail = myAcountPage.eMail;
    // expect(currentEmail).toMath(newUserCredentials.eMail)
    // const currentUserId = myAcountPage.userId;
    // expect(currentUserId).not.toBeEmpty();
    // await page.waitForTimeout(1000);

    await deliveryDetailsPage.fillUserDetails(newUserData);
    await page.waitForTimeout(1000);
    

})