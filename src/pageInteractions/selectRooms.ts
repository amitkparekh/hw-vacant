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
      const option = document.querySelector(element).children[
        childNumber
      ] as HTMLOptionElement;
      let text: string = option.innerHTML;
      let value: string = option.value;
      return [text, value];
    },
    selector,
    childNumber,
  );
  return optionDetails;
}

async function filterOptions(page: Page, dropdownSelector: string, filters: RegExp) {
  // Get the total number of rooms available
  const totalOptionsCount: number = await countOptions(page, dropdownSelector);

  // Init an empty array for the results
  let viableOptions: string[] = [];

  for (let counter = 0; counter < totalOptionsCount; counter++) {
    const optionDetails: string[] = await getOption(page, dropdownSelector, counter);

    const optionText: string = optionDetails[0];
    const optionValue: string = optionDetails[1];

    if (await filters.test(optionText)) {
      viableOptions.push(optionValue);
    } else {
    }
  }

  return viableOptions;
}

async function selectRooms(page: Page, roomsFilter: RegExp) {
  const roomDropdownSelector: string = 'select#dlObject';
  const viableRooms: string[] = await filterOptions(
    page,
    roomDropdownSelector,
    roomsFilter,
  );
  await page.select(roomDropdownSelector, ...viableRooms);
}

export default selectRooms;
