import { Page } from 'puppeteer';

async function countOptions(page: Page, dropdownSelector: string) {
  const optionCount: number = await page.evaluate((element: string) => {
    return document.querySelector(element).childElementCount;
  }, dropdownSelector);

  return optionCount;
}

async function getOption(page: Page, dropdownSelector: string, childNumber: number) {
  let optionDetails = await page.evaluate(
    (element: string, childNumber: number) => {
      const option = document.querySelector(element).children[childNumber] as HTMLOptionElement;
      let text = option.innerHTML;
      let value = option.value;
      return [text, value];
    },
    dropdownSelector,
    childNumber,
  );
  return optionDetails;
}

async function filterOptions(page: Page, dropdownSelector: string, filters: Array<string>) {
  const initialOptionsCount: number = await countOptions(page, dropdownSelector);
  let viableOptions = [];

  for (let counter = 0; counter < initialOptionsCount; counter++) {
    const optionDetails: Array<string> = await getOption(page, dropdownSelector, counter);

    const optionValue: string = optionDetails[1];

    const optionText: string = optionDetails[0];

    const optionTextLower = optionText.toLowerCase();

    if (
      !filters.some(function(element) {
        return optionTextLower.indexOf(element) >= 0;
      })
    ) {
      viableOptions.push(optionValue);
    }
  }

  return viableOptions;
}

async function selectRooms(page: Page, excludedRooms: Array<string>) {
  const roomDropdownSelector: string = 'select#dlObject';
  const viableRooms: Array<string> = await filterOptions(page, roomDropdownSelector, excludedRooms);
  await page.select(roomDropdownSelector, ...viableRooms);
}

export default selectRooms;
