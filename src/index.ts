import * as puppeteer from "puppeteer";
import logger from "./logger";
import login from "./commands/login";
import { isProduction, parseDate } from './utils';
import { getBuyingLotteryCount } from "./commands/lottery";

const autoPurchase = async () => {
  const browser = await puppeteer.launch({
    headless: isProduction()
  });
  const page = await browser.newPage();

  try {
    await login(page);
    const buyingCount = await getBuyingLotteryCount(page, parseDate("2022-08-13").startOf('day'));
    logger.info(`Already purchased lottery count: ${buyingCount}`);
  } finally {
    browser.close();
  }
}

logger.info("start auto-purchase-lottery")

autoPurchase()
  .then(() => {
    logger.info("auto purchase finished")
  })
  .catch((err) => {
    logger.error("unhandled error occurred", err)
  });