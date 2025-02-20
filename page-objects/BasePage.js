

export class BaseProduct {
    constructor(page){
        this.page = page
    }

    openPage = async (timeout=2000) => {
        await this.page.goto("/")
        await this.page.waitForTimeout(timeout);
    }
}