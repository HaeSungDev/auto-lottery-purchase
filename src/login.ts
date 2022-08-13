import * as puppeteer from "puppeteer";
import logger from "./logger";
import * as constant from "./constants";
import { username, password } from "./configs";

export default async (browser) => {
  logger.info("try to login...");

  const page = await browser.newPage();
  await page.goto(constant.lotteryLoginUrl);
  await page.type("#userId", username)
  await page.type(".form input[name='password']", password)
  await page.click('.form .btn_common')
}