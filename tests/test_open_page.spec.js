import { test, expect} from "@playwright/test"
import { ProductPage } from "../page-objects/ProdructPage";

test.only("Product Page Add To Masket", async ({page})=>{

    //1. Create page products instances
    const idexItemsToAdd = [1, 2, 4]
    const productPage =  new ProductPage(page)
    await productPage.openPage()

    // 2. Add the products
    for (const index of idexItemsToAdd){
        productPage.addProductToBasket(index);
        await page.waitForTimeout(500);
    }
    // productPage.addProductToBasket(2);
    // await page.waitForTimeout(2000);

    // 3. Go to checkout
    productPage.goToCheckoutPage();
   
   
    




    // // const addToBasketButton = page.getByRole("button", {name: 'Add to Basket'}).first();
    // // 3. Read elements, buttons and basket counter
    // const addToBasketButton = page.locator("[data-qa='product-button']")
    // const basketCounter = page.locator("[data-qa='header-basket-count']")
    // const checkOutLink = page.getByRole('link', {name: 'Checkout'})
    // // 4. convert to an array
    // const buttons = await addToBasketButton.all();
    // let counter = 0
    // // 5. Assert basket counter initial value, must be zero
    // await expect(basketCounter).toHaveText(counter.toString())
    // // 6. Evaluates the addition of the products to the basket
    // for (const button of buttons){
    //     await button.waitFor(); // Wait for button
    //     await expect(button).toHaveText('Add to Basket'); // expects to have the 'Add to Basket'
    //     await button.click();  // click on button
    //     await page.waitForTimeout(2000); // waits for 2s
    //     await expect(button).toHaveText('Remove from Basket'); // expects to have the 'Remove from Basket'
    //     counter ++; // increases the counter
    //     await expect(basketCounter).toHaveText(counter.toString());  // expctes to have a plus one in the count
    // }
    // // 7. Got to checkout page
    // await checkOutLink.waitFor();
    // await page.waitForTimeout(1000);
    // await checkOutLink.click();
    // await page.waitForURL("/basket");
    await page.waitForTimeout(2000);
    

})