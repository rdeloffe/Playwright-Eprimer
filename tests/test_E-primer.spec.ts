import { test, expect } from '@playwright/test';

test('Connection', async ({ page }) => {
  await page.goto('https://exploratorytestingacademy.com/app/');
  await expect(page.getByRole('heading', { name: 'E-Primer an e-prime checking tool' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Alan Richardson, eviltester' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'e-prime' })).toBeVisible();

  await expect(page.getByText('Word Count:')).toBeVisible();
  await expect(page.getByText('Discouraged Words:')).toBeVisible();
  await expect(page.getByText('Possible Violations:')).toBeVisible();

  await expect(page.getByText('Text:')).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Text:' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Text:' })).toHaveText('');

  await expect(page.getByRole('button', { name: 'Check For E-Prime' })).toBeVisible();
});

//Cas Passant
test('Passant sans rien', async ({ page }) => {
  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill('');
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('0');
  await expect(page.locator('#discouragedWordCount')).toHaveText('0');
  await expect(page.locator('#possibleViolationCount')).toHaveText('0');
});

test('Test WordCount + Bouton ', async ({ page }) => {
  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill('Hello World');
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('2');
  await expect(page.locator('#discouragedWordCount')).toHaveText('0');
  await expect(page.locator('#possibleViolationCount')).toHaveText('0');
});

test('Test WordCount, discourage + Bouton ', async ({ page }) => {
  const textboxText = ('Be is a discouraged word');
  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill(textboxText);
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('5');
  await expect(page.locator('#discouragedWordCount')).toHaveText('2');
  await expect(page.locator('#possibleViolationCount')).toHaveText('0');

  await expect(page.getByText(textboxText)).toBeVisible();
  await expect(page.getByText(textboxText)).toHaveText(textboxText);
});

test('Test WordCount, discourage, PossibleVio + Bouton ', async ({ page }) => {
  const textboxText = ("Mother's Day is a discouraged word");

  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill(textboxText);
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('6');
  await expect(page.locator('#discouragedWordCount')).toHaveText('1');
  await expect(page.locator('#possibleViolationCount')).toHaveText('1');

  await expect(page.getByText(textboxText)).toBeVisible();
  await expect(page.getByText(textboxText)).toHaveText(textboxText);
  //close window
  await page.close();
});

//Cas non passant ne prend pas en compte Be et 's qui doit etre +1 dans discouragedWordCount et +1 dans possibleViolationCount
test('Test ViolationCount + discouragedCount', async ({ page }) => {
  const textboxText = ("Be's is a discouraged's word's");

  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill(textboxText);
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('5');
  await expect(page.locator('#discouragedWordCount')).toHaveText('1');
  await expect(page.locator('#possibleViolationCount')).toHaveText('3');

  await expect(page.getByText(textboxText)).toBeVisible();
  await expect(page.getByText(textboxText)).toHaveText(textboxText);
  //close window
  await page.close();
});

//Cas non passant qui ne mets pas de limite de caractere dans le textbox pour un mot donc dépasse la case grisse (56 caracteres apres cela depasse)
test('Test taille affichage gris', async ({ page }) => {
  const textboxText = ("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  const charCount = textboxText.length;
  console.log(`Nombre de caractères saisis : ${charCount}`);

  await page.goto('https://exploratorytestingacademy.com/app/'); 

  await page.getByRole('textbox', { name: 'Text:' }).fill(textboxText);
  await page.getByRole('button', { name: 'Check For E-Prime' }).click();

  await expect(page.locator('#wordCount')).toHaveText('1');
  await expect(page.locator('#discouragedWordCount')).toHaveText('0');
  await expect(page.locator('#possibleViolationCount')).toHaveText('0');
  
  await expect(page.getByText(textboxText)).toBeVisible();
  await expect(page.getByText(textboxText)).toHaveText(textboxText);
  //close window
});










