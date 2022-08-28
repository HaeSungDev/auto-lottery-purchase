import { Dayjs } from "dayjs"
import { getUpcomingResultDay, parseDate, sleep } from "../utils"
import { Page } from "puppeteer"
import { lotterySearchUrl } from "../constants"

export const getBuyingLotteryCount = async (page: Page, lotteryDay: Dayjs = getUpcomingResultDay()) => {
  await page.goto(lotterySearchUrl);
  await page.waitForSelector("#lottoId", { timeout: 10000 });
  await page.select("#lottoId", "LO40");
  await page.click(".period a[href*='30']");
  await page.click("#submit_btn");

  await page.waitForTimeout(5000);
  const iframeElement = await page.$("#lottoBuyList");
  const iframe = await iframeElement.contentFrame();

  const headerTexts = await iframe.$$eval(".tbl_data thead th", (elements) => {
    return elements.map(e => e.textContent);
  });
  const buyingCountIndex = headerTexts.findIndex(headerText => headerText === "구입매수");
  const lotteryDayIndex = headerTexts.findIndex(headerText => headerText === "추첨일");

  const tablesRows = await iframe.$$(".tbl_data tbody tr");
  const items = [];
  for (const tableRow of tablesRows) {
      const data = await tableRow.$$eval("td", (elements) => elements.map(element => element.textContent.trim()));
      if (data.length > buyingCountIndex && data.length > lotteryDayIndex) {
        items.push({
          buyingCount: parseInt(data[buyingCountIndex]),
          lotteryDay: parseDate(data[lotteryDayIndex])
        });
      }
  }
  
  return items.filter(item => item.lotteryDay.isSame(lotteryDay, 'day'))
    .reduce((result, item) => result + item.buyingCount, 0)
}