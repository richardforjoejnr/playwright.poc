class BasePage {
  constructor(page, path) {
    this.path = path;
    this.page = page
  }

  async launch() {
    await this.page.goto(`https://news.sky.com/${this.path}`);
  }
}

module.exports = BasePage;
