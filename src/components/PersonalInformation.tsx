import React from 'react';

interface PersonalInformationProps {
  formData: {
    name: string;
    email: string;
    gender: string;
    country: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  nextStep: () => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({ formData, handleChange, nextStep }) => {
  return (
    <div>
      <h2>Step 1: Personal Information</h2>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <label id="gender">Gender:</label>
      <div id="radio-btn">
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
        />
        <label id="radio-btn" htmlFor="female">Female</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
        />
      </div>

      <label htmlFor="country">Country:</label>
      <select
        id="country"
        name="country"
        value={formData.country}
        onChange={handleChange}
      >
        <option value="">Select Country</option>
        <option value="in">India</option>
        <option value="us">United States</option>
        <option value="ca">Canada</option>
        <option value="uk">United Kingdom</option>
      </select>

      <button type="button" onClick={nextStep}>
        Next
      </button>
    </div>
  );
};

export default PersonalInformation;
