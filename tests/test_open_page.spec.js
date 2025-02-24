import { test, expect} from "@playwright/test"
import { ProductPage, sortingBy } from "../page-objects/ProdructPage";
import { VisitPage } from "../page-objects/visitPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { LoginPage } from "../page-objects/loginPage";
import {SigupPage} from "../page-objects/singupPage";

test.only("Product Page Add To Masket", async ({page})=>{

    //1. Create page products instances
    const idexItemsToAdd = [1, 2, 4];
    const productPage =  new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SigupPage(page);
    const loginPage = new LoginPage(page);
    const newUserCredentials = {
        "eMail": "juancho@kittymail.com",
        "password": "juancho12395"
    }
    await productPage.openPage();

    // 2. Sorting elements
    await productPage.sortBy(sortingBy.mostExpensive);
    await page.waitForTimeout(50);
    

    // 3. Add the products
    for (const index of idexItemsToAdd){
        productPage.addProductToBasket(index);
        await page.waitForTimeout(50);
    }

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

   
    

})