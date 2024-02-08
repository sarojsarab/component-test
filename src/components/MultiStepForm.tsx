import React, { useState, useEffect } from 'react';
import PersonalInformation from './PersonalInformation';
import OtherInformation from './OtherInformation';

interface FormData {
  name: string;
  email: string;
  gender: string;
  country: string;
  age: string;
  dob: string;
  comments: string;
  resume: File | null;
  error: string | null; 
  success: string | null;
}

const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    gender: '',
    country: '',
    age: '',
    dob: '',
    comments: '',
    resume: null,
    error: null,
    success: null,
  });

  // Load saved form data from local storage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem('formData');
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  // Save form data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => {
    if (step === 1 && formData.name ==='') {
      setFormData({ ...formData, error: 'Please enter your name'});
      return;
    }

    if (step === 1 && !validateEmail(formData.email)) {
      setFormData({ ...formData, error: 'Invalid email format'});
      return;
    }

    if (step === 1 && formData.gender === '') {
      setFormData({ ...formData, error: 'Please select gender'});
      return;
    }

    if (step === 1 && formData.country === '') {
      setFormData({ ...formData, error: 'Please select country'});
      return;
    }
    setFormData({ ...formData, error: ''});
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'resume') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files && fileInput.files[0];
      setFormData({ ...formData, resume: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.age === '') {
      setFormData({ ...formData, error: 'Please enter a value for age', success: null });
      return;
    }

    if (formData.dob === '') {
      setFormData({ ...formData, error: 'Please enter a value for dob', success: null });
      return;
    }

    if (formData.comments === '') {
      setFormData({ ...formData, error: 'Please enter a value for comment', success: null });
      return;
    }
    
    if (formData.resume) {
      const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

      if (!allowedFileTypes.includes(formData.resume.type)) {
        setFormData({ ...formData, error: 'Invalid file format. Please upload a PDF, DOC, or DOCX file.', success: null });
        return;
      } else {
        setFormData({ ...formData, error: null, success: 'Form Submitted.' });
      }
    } else {
      setFormData({ ...formData, error: 'Invalid file format. Please upload a PDF, DOC, or DOCX file.', success: null });
      return;
    }
    console.log('Form submitted:', formData);     
  };

  return (
    <div>
      
      <form onSubmit={handleSubmit}>
        {formData.error && <div className="error-message">{formData.error}</div>}
        {formData.success && <div className="success-message">{formData.success}</div>}
        {step === 1 && (
          <PersonalInformation
            formData={formData}
            handleChange={handleChange}
            nextStep={nextStep}
          />
        )}

        {step === 2 && (
          <OtherInformation
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )}
      </form>
    </div>
  );
};

export default MultiStepForm;
