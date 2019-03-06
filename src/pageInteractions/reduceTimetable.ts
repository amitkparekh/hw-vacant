import { Page } from 'puppeteer';

async function removeEveryElement(page: Page, selector: string) {
  await page.evaluate((element: string) => {
    return document.querySelectorAll(element).forEach(e => e.parentNode.removeChild(e));
  }, selector);
}

async function removeEveryChild(page: Page, selector: string, childNumber: number) {
  await page.evaluate(
    (element: string, count: number) => {
      return document
        .querySelectorAll(element)
        .forEach(e => e.children[count].remove());
    },
    selector,
    childNumber,
  );
}

async function reduceTimetable(page: Page) {
  // Remove all the footers since they contain no useful information
  await removeEveryElement(page, '.footer-border-args');

  // Remove the element right above the spreadsheet which says the day, also useless
  await removeEveryElement(page, 'p');

  // Rename 'Course Title' to 'Activity'
  await page.evaluate(
    (selector: string, columnNumber: number, text: string) => {
      return document
        .querySelectorAll(selector)
        .forEach(e => (e.children[columnNumber].innerHTML = text));
    },
    '.columnTitles',
    1,
    'Activity',
  );

  // Copy activity if Course Name is blank
  await page.evaluate((element: string) => {
    return document.querySelectorAll(element).forEach(e => {
      let first = e.children[1].innerHTML;
      let second = e.children[2].innerHTML;
      if (first == '&nbsp;  ') {
        e.children[1].innerHTML = second;
      }
    });
  }, 'table.spreadsheet tr');

  // Remove useless columns
  await removeEveryChild(page, 'table.spreadsheet tr', 8);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 8);
  await removeEveryChild(page, 'table.spreadsheet tr', 6);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 6);
  await removeEveryChild(page, 'table.spreadsheet tr', 3);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 3);
  await removeEveryChild(page, 'table.spreadsheet tr', 0);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 0);
  await removeEveryChild(page, 'table.spreadsheet tr', 1);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 1);
}

export default reduceTimetable;
