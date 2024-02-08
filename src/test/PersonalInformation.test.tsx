import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PersonalInformation from '../components/PersonalInformation';

describe('Render and verify personal information form component', () => {
  test('renders step 1 of the form', () => {
      const { getByText, getByLabelText } = render(<PersonalInformation formData={{ 
        name: '', 
        email: '',
        gender: '',
        country: '', 
      }} 
      handleChange={() => {}} 
      nextStep={() => {}} 
      />);

      const stepTitle = getByText('Step 1: Personal Information');
      expect(stepTitle).toBeInTheDocument();
      const nameInput = getByLabelText('Name:');
      expect(nameInput).toBeInTheDocument();
      const emailInput = getByLabelText('Email:');
      expect(emailInput).toBeInTheDocument();
      const radioInput = getByText('Gender:');
      expect(radioInput).toBeInTheDocument();
      const countryInput = getByLabelText('Country:');
      expect(countryInput).toBeInTheDocument();
      const nextButton = getByText('Next');
      expect(nextButton).toBeInTheDocument();
    });
})
