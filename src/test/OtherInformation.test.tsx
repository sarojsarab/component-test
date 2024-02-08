import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import OtherInformation from '../components/OtherInformation';

describe('Render and verify other information form component', () => {
  test('renders step 2 of the form', () => {
      const { getByText, getByLabelText } = render(<OtherInformation formData= {{ 
            age: '', 
            dob: '', 
            comments: '', 
            resume: null 
        }} 
        handleChange={() => {}} 
        prevStep={() => {}} 
        handleSubmit={() => {}} 
        />);

      const stepTitle = getByText('Step 2: Other Information');
      expect(stepTitle).toBeInTheDocument();
    
      const ageInput = getByLabelText('Age:');
      expect(ageInput).toBeInTheDocument();
      const dobInput = getByLabelText('Date of Birth:');
      expect(dobInput).toBeInTheDocument();
      const commentsInput = getByLabelText('Comments:');
      expect(commentsInput).toBeInTheDocument();
      const resumeInput = getByLabelText('Upload Resume:');
      expect(resumeInput).toBeInTheDocument();
    });
})
