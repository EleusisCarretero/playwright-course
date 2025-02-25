import { test, expect} from "@playwright/test"
import { ProductPage, sortingBy } from "../page-objects/ProdructPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { LoginPage } from "../page-objects/loginPage";
import { SigupPage } from "../page-objects/singupPage";
import { PaymentPage } from "../page-objects/paymentPage"
import {v4 as uuidv4} from 'uuid';
import { DeliveryDetailsPage } from "../page-objects/deliveryDetailsPage"
import { ThankYouPage } from "../page-objects/thankYouPage"

test("Product Page Add To Masket", async ({page})=>{

    //1. Create page products instances
    const idexItemsToAdd = [1, 2, 4];
    const productPage =  new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    const signupPage = new SigupPage(page);
    const loginPage = new LoginPage(page);
    const thankYouPage = new ThankYouPage(page);
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
    const paymentData = {
        "creditcardowner": "Calcifer Carretero",
        "creditcardnumber": "123-332-454-2323",
        "validuntil": "0626",
        "creditcardcvc": "233"
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

    // 9. register the new user
    await signupPage.registerNewUser();
    await page.waitForTimeout(1000);

    await deliveryDetailsPage.fillUserDetails(newUserData);
    await page.waitForTimeout(1000);

    // 10. Save user datails
    await deliveryDetailsPage.saveUserDetails(newUserData);
    await page.waitForTimeout(1000);
    
    // 11. Continue Buying
    await deliveryDetailsPage.continueToPayment();

    // 12. Enter discound code
    const paymentPage = new PaymentPage(page);
    await paymentPage.submitDiscount();

    // 13. fill payment data
    await paymentPage.fillPaymentMethod(paymentData);

    // 14. Do the payment
    await paymentPage.pay();

    // 15. Finallize and go back
    await thankYouPage.backToShop();

})