import { test, expect} from "@playwright/test"
import { ProductPage } from "../page-objects/ProdructPage";
import { VisitPage } from "../page-objects/visitPage";
import { CheckoutPage } from "../page-objects/checkoutPage";

test.only("Product Page Add To Masket", async ({page})=>{

    //1. Create page products instances
    const idexItemsToAdd = [1, 2, 4];
    const productPage =  new ProductPage(page);
    const checkoutPage = new CheckoutPage(page);
    await productPage.openPage();

    // 2. Add the products
    for (const index of idexItemsToAdd){
        productPage.addProductToBasket(index);
        await page.waitForTimeout(500);
    }

    // 3. Go to checkout
    await productPage.goToCheckoutPage();

    // 4. Remove item
    await checkoutPage.removeCheapestProduct();
   
    

})