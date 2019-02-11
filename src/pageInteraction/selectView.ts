import { Page } from 'puppeteer';

async function selectView(page: Page, view: string) {
  switch (view) {
    case 'list':
      await page.select('select#dlType', 'TextSpreadsheet;swsurl;SWSCUST Location TextSpreadsheet');
      break;
    case 'grid':
    default:
      break;
  }
}

export default selectView;
