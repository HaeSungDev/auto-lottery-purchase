import * as puppeteer from "puppeteer";
import logger from "./logger";
import login from "./login";
import { isProduction } from './utils';

const autoPurchase = async () => {
  const browser = await puppeteer.launch({
    headless: isProduction()
  });

  try {
    await login(browser);
  } finally {
    browser.close();
  }
}

autoPurchase()
  .then(() => {
    logger.info("auto purchase finished")
  })
  .catch((err) => {
    logger.error("unhandled error occurred", err)
  });