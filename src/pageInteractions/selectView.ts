import { Page } from 'puppeteer';

type Views = 'list' | 'grid';

async function selectView(page: Page, view: Views) {
  switch (view) {
    case 'list':
      await page.select(
        'select#dlType',
        'TextSpreadsheet;swsurl;SWSCUST Location TextSpreadsheet',
      );
      break;
    case 'grid':
    default:
      break;
  }
}

export default selectView;
