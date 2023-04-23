const { webkit, test } = require("@playwright/test");

test("Type something", async () => {
  // function code
  // launching browser
  const browser = await webkit.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/forgot_password");
  // code to type in email textbox
  const email = await page.$("#email");
  // delaying typing 50 ms to simulate real user speed typing
  await email.type("ixchel@mail.com", { delay: 50 });
  await browser.close();
});

test("Play music", async () => {
  // function code
  // launching browser
  const browser = await webkit.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("https://www.apronus.com/music/lessons/unit01.htm");
  // click on  the keynotes
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");

  // Code for my musical "Master piece"
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(3) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(3) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(6) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(6) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(10) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(6) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(10) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(8) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(6) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(5) > button");
  await page.click("#t1 > table > tr:nth-child(1) > td:nth-child(1) > button");

  await browser.close();
});

test("Click dropdown", async () => {
  // function code
  const browser = await webkit.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();
  await page.goto("https://the-internet.herokuapp.com/dropdown");
  const dropdown = await page.$("#dropdown");
  // value
  await dropdown.selectOption({ value: "1" });
  // label
  await dropdown.selectOption({ label: "Option 2" });
  // index
  await dropdown.selectOption({ index: 1 });
  // values inside this select
  const availableOptions = await dropdown.$$("option");
  for (let i = 0; i < availableOptions.length; i++) {
    console.log(await availableOptions[i].innerText());
  }

  await browser.close();
});
