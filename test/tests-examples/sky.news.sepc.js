const { webkit, test } = require("@playwright/test");
const UkPage = require("../../pom/models/uk.page");

test("Launch sky news", async () => {
  const browser = await webkit.launch({ headless: false, sloMo: 10000 });
  const page = await browser.newPage();
  //function code
  const ukpage = new UkPage(page);
  await ukpage.launch();

});

