const { webkit, test } = require("@playwright/test");
const UkPage = require("../../pom/models/uk.page");

test("Launch sky news", async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  //function code
  const ukpage = new UkPage(page);
  await ukpage.launch();

});

