const iframe = 'iframe[src*="cdn.privacy-mgmt.com"]'
const title = '[data-role="short-text-target"]'
class BasePage {

    
  constructor(page, path) {
    this.path = path;
    this.page = page
  }

  async launch() {
    await this.page.goto(`https://news.sky.com/${this.path}`);
    await this.clickAccept()
    
  }

  async clickAccept() {
    const frame = await page.waitForSelector(
        iframe,
        { timeout: 10000 }
      );
      const iframe = await frame.contentFrame();
    
      // Wait for the 'Accept all' button to be visible and click it
      await iframe.waitForSelector("text=Accept all", { timeout: 10000 });
      const acceptAllButton = await iframe.locator("text=Accept all");
      await acceptAllButton.click();

  }
}

module.exports = BasePage;
