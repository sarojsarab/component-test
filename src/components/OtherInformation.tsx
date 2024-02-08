import React from 'react';

interface OtherInformationProps {
  formData: {
    age: string;
    dob: string;
    comments: string;
    resume: File | null;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>) => void;
  prevStep: () => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const OtherInformation: React.FC<OtherInformationProps> = ({ formData, handleChange, prevStep, handleSubmit }) => {
  return (
    <div>
      <h2>Step 2: Other Information</h2>
      <label htmlFor="age">Age:</label>
      <input
        type="number"
        id="age"
        name="age"
        value={formData.age}
        onChange={handleChange}
        required
      />

      <label htmlFor="dob">Date of Birth:</label>
      <input
        type="date"
        id="dob"
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        required
      />

      <label htmlFor="comments">Comments:</label>
      <textarea
        id="comments"
        name="comments"
        value={formData.comments}
        onChange={handleChange}
      ></textarea>

      <label htmlFor="resume">Upload Resume:</label>
      <input
        type="file"
        id="resume"
        name="resume"
        onChange={(e) => handleChange(e as React.ChangeEvent<HTMLInputElement>)}
        accept=".pdf,.doc,.docx"
      />
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <button type="button" onClick={prevStep}>
        Previous
      </button>
    </div>
  );
};

export default OtherInformation;
