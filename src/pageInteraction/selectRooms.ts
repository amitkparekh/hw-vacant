import { Page } from 'puppeteer';

/**
 * Count the options in a <select> element
 *
 * @param page
 * @param selector Identifier for the <select> element
 * @returns Number of options in a dropdown list
 */
async function countOptions(page: Page, selector: string) {
  const optionCount: number = await page.evaluate((element: string) => {
    return document.querySelector(element).childElementCount;
  }, selector);

  return optionCount;
}

async function getOption(page: Page, selector: string, childNumber: number) {
  let optionDetails: string[] = await page.evaluate(
    (element: string, childNumber: number) => {
      const option = document.querySelector(element).children[childNumber] as HTMLOptionElement;
      let text: string = option.innerHTML;
      let value: string = option.value;
      return [text, value];
    },
    selector,
    childNumber,
  );
  return optionDetails;
}

async function filterOptions(page: Page, dropdownSelector: string, filters: string[]) {
  const initialOptionsCount: number = await countOptions(page, dropdownSelector);
  let viableOptions = [];

  for (let counter = 0; counter < initialOptionsCount; counter++) {
    const optionDetails: string[] = await getOption(page, dropdownSelector, counter);

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

async function selectRooms(page: Page, excludedRooms: string[]) {
  const roomDropdownSelector: string = 'select#dlObject';
  const viableRooms: string[] = await filterOptions(page, roomDropdownSelector, excludedRooms);
  await page.select(roomDropdownSelector, ...viableRooms);
}

export default selectRooms;
