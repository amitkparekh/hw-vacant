import { Page } from 'puppeteer';

async function removeEveryElement(page: Page, identifier: string) {
  await page.evaluate((element: string) => {
    return document.querySelectorAll(element).forEach(e => e.parentNode.removeChild(e));
  }, identifier);
}

async function removeEveryChild(page: Page, identifier: string, childNumber: number) {
  await page.evaluate(
    (element: string, count: number) => {
      return document.querySelectorAll(element).forEach(e => e.children[count].remove());
    },
    identifier,
    childNumber,
  );
}

async function reduceTimetable(page: Page) {
  await removeEveryElement(page, '.footer-border-args');
  // await removeEveryElement(page, '.header-border-args');
  await removeEveryElement(page, 'p');

  // Remove useless columns
  await removeEveryChild(page, 'table.spreadsheet tr', 8);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 8);
  await removeEveryChild(page, 'table.spreadsheet tr', 6);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 6);
  await removeEveryChild(page, 'table.spreadsheet tr', 3);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 3);
  await removeEveryChild(page, 'table.spreadsheet tr', 0);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 0);

  // Rename first column to 'Activity'
  await page.evaluate(
    (element: string, text: string) => {
      return document
        .querySelectorAll(element)
        .forEach(e => (e.firstElementChild.innerHTML = text));
    },
    '.columnTitles',
    'Activity',
  );

  // Copy activity if Course Name is blank
  await page.evaluate((element: string) => {
    return document.querySelectorAll(element).forEach(e => {
      let first = e.children[0].innerHTML;
      let second = e.children[1].innerHTML;
      if (first == '&nbsp;  ') {
        e.children[0].innerHTML = second;
      }
    });
  }, 'table.spreadsheet tr');
  await removeEveryChild(page, 'table.spreadsheet tr', 1);
  await removeEveryChild(page, 'table.spreadsheet colgroup', 1);

  // Remove activity column
  // await removeEveryChild(page, 'table.spreadsheet tr', 0);
  // await removeEveryChild(page, 'table.spreadsheet colgroup', 0);
}

export default reduceTimetable;
