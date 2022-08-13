import * as puppeteer from "puppeteer";
import logger from "./logger";
import login from "./commands/login";
import { isProduction } from './utils';

const autoPurchase = async () => {
  const browser = await puppeteer.launch({
    headless: isProduction()
  });
  const page = await browser.newPage();

  try {
    await login(page);
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