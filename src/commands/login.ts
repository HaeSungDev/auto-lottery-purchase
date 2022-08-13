import { Page } from "puppeteer"
import logger from "../logger";
import * as constant from "../constants";
import { username, password } from "../configs";

export default async (page: Page) => {
  logger.info("try to login...");

  await page.goto(constant.lotteryHomeUrl);
  await page.waitForSelector(
    "form .log a[href*='login']",
    { timeout: 10000 }
  )
  await page.click("form .log a[href*='login']")
  await page.waitForSelector(
    "#userId",
    { timeout: 10000 }
  )
  await page.type("#userId", username)
  await page.type(".form input[name='password']", password)
  await page.click(".form .btn_common")

  try {
    await page.waitForSelector(
      "form .log a[href*='logout']",
      { timeout: 10000 }
    )
    logger.info("login success");
  } catch (err) {
    logger.info('login fail')
    throw new Error("login fail error. check username or password.");
  }
}