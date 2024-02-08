import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiStepForm from '../components/MultiStepForm';

// Mocking localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key],
    setItem: (key: string, value: string) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Verify the components and actions', () => {
    beforeEach(() => {
        // Clear localStorage before each test
        localStorage.clear();
      });
      
    test('renders the first step of the form and validate', () => {
        render(<MultiStepForm />);
        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const maleRadioInput = screen.getByLabelText('Male');
        const countryInput = screen.getByLabelText('Country:');
        const nextButton = screen.getByText('Next'); 

        //continue without filling the data
        fireEvent.click(nextButton);
        let errorMessage = screen.getByText('Please enter your name');
        expect(errorMessage).toBeInTheDocument();

         //fill name and continue
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.click(nextButton);
        errorMessage = screen.getByText('Invalid email format');
        expect(errorMessage).toBeInTheDocument();

        //fill email and continue
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.click(nextButton);
        errorMessage = screen.getByText('Please select gender');
        expect(errorMessage).toBeInTheDocument();

        //Select gender and continue
        fireEvent.click(maleRadioInput);
        fireEvent.click(nextButton);
        errorMessage = screen.getByText('Please select country');
        expect(errorMessage).toBeInTheDocument();

        //Select country and continue
        fireEvent.change(countryInput, { target: { value: 'in' } });
        fireEvent.click(nextButton);

        const ageLabel = screen.getByLabelText('Age:');
        const dobLabel = screen.getByLabelText('Date of Birth:');
        
        expect(ageLabel).toBeInTheDocument();
        expect(dobLabel).toBeInTheDocument();

    });
        
    test('displays error message for invalid email format', () => {
        render(<MultiStepForm />);

        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const nextButton = screen.getByText('Next');
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
        fireEvent.click(nextButton);
        
        const errorMessage = screen.getByText('Invalid email format');
        expect(errorMessage).toBeInTheDocument();
    });

    test('check validation for all fields in page2', () => {
        render(<MultiStepForm />);
        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const maleRadioInput = screen.getByLabelText('Male');
        const countryInput = screen.getByLabelText('Country:');
        const nextButton = screen.getByText('Next'); 

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.click(maleRadioInput);
        fireEvent.change(countryInput, { target: { value: 'in' } });
        fireEvent.click(nextButton);

        const ageInput = screen.getByLabelText('Age:');
        const dobInput = screen.getByLabelText('Date of Birth:');
        const commentInput = screen.getByLabelText('Comments:');
        const resumeInput = screen.getByLabelText('Upload Resume:');
        const submitButton = screen.getByText('Submit');
        
        //click on submit and validate
        fireEvent.click(submitButton);
        let errorMessage = screen.getByText('Please enter a value for age');
        expect(errorMessage).toBeInTheDocument();

        //Enter a value for age and click on submit
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.click(submitButton);
        errorMessage = screen.getByText('Please enter a value for dob');
        expect(errorMessage).toBeInTheDocument()
        
        //Enter a value for age and click on submit
        fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
        fireEvent.click(submitButton);
        errorMessage = screen.getByText('Please enter a value for comment');
        expect(errorMessage).toBeInTheDocument()

        //Enter a value for age and click on submit
        fireEvent.change(commentInput, { target: { value: 'Test comment' } });
        fireEvent.click(submitButton);
        errorMessage = screen.getByText('Invalid file format. Please upload a PDF, DOC, or DOCX file.');
        expect(errorMessage).toBeInTheDocument()

        //Enter a value for age and click on submit
        const validFile = new File([''], 'valid_resume.pdf', { type: 'application/pdf' });
        fireEvent.change(resumeInput, { target: { files: [validFile] } });
        fireEvent.click(submitButton);
        const successMessage = screen.getByText('Form Submitted.');
        expect(successMessage).toBeInTheDocument()
    });
        
    test('displays error message for invalid file type', () => {
        render(<MultiStepForm />);
        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const maleRadioInput = screen.getByLabelText('Male');
        const countryInput = screen.getByLabelText('Country:');
        const nextButton = screen.getByText('Next');
        
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.click(maleRadioInput);
        fireEvent.change(countryInput, { target: { value: 'in' } });
        fireEvent.click(nextButton);
        
        const ageInput = screen.getByLabelText('Age:');
        const dobInput = screen.getByLabelText('Date of Birth:');
        const commentInput = screen.getByLabelText('Comments:');
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
        fireEvent.change(commentInput, { target: {value: 'Test comment' } });

        const resumeInput = screen.getByLabelText('Upload Resume:');
        const submitButton = screen.getByText('Submit');
        
        // Simulate uploading a file with an invalid type
        const invalidFile = new File([''], 'invalid_resume.txt', { type: 'text/plain' });
        fireEvent.change(resumeInput, { target: { files: [invalidFile] } });
        fireEvent.click(submitButton);
        
        const fileErrorMessage = screen.getByText('Invalid file format. Please upload a PDF, DOC, or DOCX file.');
        expect(fileErrorMessage).toBeInTheDocument();
    });
    
    test('allows user to Submit and resume progress', () => {
        render(<MultiStepForm />);
        
        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const maleRadioInput = screen.getByLabelText('Male');
        const countryInput = screen.getByLabelText('Country:');
        const nextButton = screen.getByText('Next');
        
        // Step 1: Enter Name and Email
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.click(maleRadioInput);
        fireEvent.change(countryInput, { target: { value: 'in' } });
        fireEvent.click(nextButton);
        
        // Step 2: Enter Age and Date of Birth
        const ageInput = screen.getByLabelText('Age:');
        const dobInput = screen.getByLabelText('Date of Birth:');
        const commentInput = screen.getByLabelText('Comments:');
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
        fireEvent.change(commentInput, { target: {value: 'Test comment' } });
        
        // Submit and reload the form
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);
        
        // Clear the form data
        fireEvent.change(nameInput, { target: { value: '' } });
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(ageInput, { target: { value: '' } });
        fireEvent.change(dobInput, { target: { value: '' } });
        
        // Reload the form and check if Saved data is restored
        render(<MultiStepForm />);
        const savedName = screen.getByDisplayValue('John Doe');
        const savedEmail = screen.getByDisplayValue('john.doe@example.com');
        
        expect(savedName).toBeInTheDocument();
        expect(savedEmail).toBeInTheDocument();
    });

    test('user able to fill everything and submit the form successfully.', () => {
        render(<MultiStepForm />);
        
        const nameInput = screen.getByLabelText('Name:');
        const emailInput = screen.getByLabelText('Email:');
        const maleRadioInput = screen.getByLabelText('Male');
        const countryInput = screen.getByLabelText('Country:');
        const nextButton = screen.getByText('Next');
        
        // Step 1: Enter Name and Email
        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.click(maleRadioInput);
        fireEvent.change(countryInput, { target: { value: 'in' } });
        fireEvent.click(nextButton);
        
        // Step 2: Enter Age and Date of Birth
        const ageInput = screen.getByLabelText('Age:');
        const dobInput = screen.getByLabelText('Date of Birth:');
        const commentInput = screen.getByLabelText('Comments:');
        const resumeInput = screen.getByLabelText('Upload Resume:');
        fireEvent.change(ageInput, { target: { value: '25' } });
        fireEvent.change(dobInput, { target: { value: '1990-01-01' } });
        fireEvent.change(commentInput, { target: {value: 'Test comment' } });
        
        const validFile = new File([''], 'valid_resume.pdf', { type: 'application/pdf' });
        fireEvent.change(resumeInput, { target: { files: [validFile] } });
        
        // Submit the form
        const submitButton = screen.getByText('Submit');
        fireEvent.click(submitButton);

        const fileSuccessMessage = screen.getByText('Form Submitted.');
        expect(fileSuccessMessage).toBeInTheDocument();
    });
})
