import { test, expect } from '@playwright/test';
import { describe } from 'node:test';

describe('e2e Tests', () => {
    
  async function clickButton({ page }, buttonText: string) {
    await page.click(`//button[text()='${buttonText}']`);
  };

  async function validateMessage( { page }, message: string, error: boolean = true ) {
    const selector = error ? '.error-message' : '.success-message';
    await page.waitForSelector(selector);

    // Assert that the success message is present
    const successMessage = await page.textContent(selector);
    expect(successMessage).toContain(message);
  };

  test('Submit form with valid data', async ({ page }) => {
    //Open app
    await page.goto('/');
  
    // Fill in the form fields in Step1
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.click('#male');
    await page.selectOption('#country', { label: 'United States' });
    await clickButton({ page }, 'Next');
    await page.waitForSelector(`//h2[contains(text(), 'Step 2: Other Information')]`);

    // Fill in the form fields in Step2
    await page.fill('#age', '25');
    await page.fill('#dob', '1990-01-01');
    await page.fill('#comments', 'Test comment');
  
    // Upload a valid file
    const filePath = 'multi-step-form/resources/test1_pdf.pdf';
    await page.setInputFiles('#resume', filePath);
  
    // Submit the form
    await clickButton({ page }, 'Submit');

    // Assert that the success message is present
    await validateMessage({ page }, 'Form Submitted.', false);
  });

  test('Verify validation error messages when submitted empty field', async ({ page }) => {
    //Open app
    await page.goto('/');

    // Click next and verify name field validation
    await clickButton({ page }, 'Next');
    await validateMessage({ page }, 'Please enter your name');
    await page.fill('#name', 'John Doe');

    // Click next and verify email field validation
    await clickButton({ page }, 'Next');
    await validateMessage({ page }, 'Invalid email format');
    await page.fill('#email', 'invalidemail');

    // Click next and verify email field validation
    await clickButton({ page }, 'Next');
    await validateMessage({ page },'Invalid email format');
    await page.fill('#email', 'john@example.com');

    // Click next and verify gender field validation
    await clickButton({ page }, 'Next');
    await validateMessage({ page }, 'Please select gender');
    await page.click('#male');
    
    // Click next and verify country field validation
    await clickButton({ page }, 'Next');
    await validateMessage({ page }, 'Please select country');
    await page.selectOption('#country', { label: 'United States' });

    // Click submit and verify age field validation in step2
    await clickButton({ page }, 'Next');
    await page.waitForSelector(`//h2[contains(text(), 'Step 2: Other Information')]`);
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Please enter a value for age');
    await page.fill('#age', '25');

    // Click submit and verify dob field validation in step2
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Please enter a value for dob');
    await page.fill('#dob', '1990-01-01');

    // Click submit and verify comment field validation in step2
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Please enter a value for comment');
    await page.fill('#comments', 'Test comment');

    // Click submit and verify file upload field validation in step2
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Invalid file format. Please upload a PDF, DOC, or DOCX file.');
    const filePath = 'multi-step-form/resources/test1_pdf.pdf';
    await page.setInputFiles('#resume', filePath);

    // Submit the form
    await clickButton({ page }, 'Submit');
    // Assert that the success message is present
    await validateMessage({ page }, 'Form Submitted.', false);
  });

  test('Submit form with invalid email and file format', async ({ page }) => {
    //Open app
    await page.goto('/');
  
    // Fill in the form fields with valid data
    await page.fill('#name', 'John Doe');

    //validate email with different format
    await page.fill('#email', 'invalidemail');
    await clickButton({ page }, 'Next');
    await validateMessage({ page },'Invalid email format');

    await page.fill('#email', 'invalidemailwith@');
    await clickButton({ page }, 'Next');
    await validateMessage({ page },'Invalid email format');


    await page.fill('#email', '@invalidemail.com');
    await clickButton({ page }, 'Next');
    await validateMessage({ page },'Invalid email format');

    await page.fill('#email', 'invalid@email');
    await clickButton({ page }, 'Next');
    await validateMessage({ page },'Invalid email format');
    
    await page.fill('#email', 'valid@email.com');
    await clickButton({ page }, 'Next');
    await page.click('#female');
    await page.selectOption('#country', { label: 'United States' });
    await clickButton({ page }, 'Next');
    await page.fill('#age', '25');
    await page.fill('#dob', '1990-01-01');
    await page.fill('#comments', 'Test comment');
  
    // Upload an invalid file (provide the correct file path)
    await page.setInputFiles('#resume', 'multi-step-form/resources/test.txt');
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Invalid file format. Please upload a PDF, DOC, or DOCX file.');

    await page.setInputFiles('#resume', 'multi-step-form/resources/test_img.png');
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Invalid file format. Please upload a PDF, DOC, or DOCX file.');

    await page.setInputFiles('#resume', 'multi-step-form/resources/test_pdf.pdf');
    await clickButton({ page }, 'Submit');
    await validateMessage({ page }, 'Form Submitted.', false);
  });

  test('Verify form saves its state while navigating to previous or next', async ({ page }) => {
    //Open app
    await page.goto('/');

    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'john@example.com');
    await page.click('#female');
    await page.selectOption('#country', { label: 'Canada' });
    await clickButton({ page }, 'Next');
    await page.fill('#age', '25');
    await page.fill('#dob', '1990-01-01');
    await page.fill('#comments', 'Test comment');

    //Navigate to previous and next and check the data
    await clickButton({ page }, 'Previous');
    await page.waitForSelector(`//h2[contains(text(), 'Step 1: Personal Information')]`);
    expect(await page.inputValue('#name')).toBe('John Doe');
    expect(await page.inputValue('#email')).toBe('john@example.com');
    expect(await page.isChecked('#female')).toBeTruthy();
    expect(await page.isChecked('#male')).toBeFalsy();
    expect(await page.inputValue('#country')).toBe('ca')
    await clickButton({ page }, 'Next');
    await page.waitForSelector(`//h2[contains(text(), 'Step 2: Other Information')]`);
    expect(await page.inputValue('#age')).toBe('25');
    expect(await page.inputValue('#dob')).toBe('1990-01-01');
    expect(await page.inputValue('#comments')).toBe('Test comment');
  });
})
