import React from 'react';
import { ArticleList, Hero } from '../components';
import { useError, useResponse } from '../context/ErrorContext';

const Landing = () => {
  const { showError } = useError();
  const { showSuccess, showInfo } = useResponse();

  const handleButtonClick = () => {
    // Simulate an error
    // Simulating an error
    const errorMessage = 'Something went wrong!';
    showError(errorMessage);

    // Simulating a success message
    const successMessage = 'Action completed successfully.';
    showSuccess(successMessage);

    // Simulating an info message
    const infoMessage = 'Here is some additional information.';
    showInfo(infoMessage);
  };
  return (
    <div>
      {/* <button onClick={handleButtonClick}>Trigger Error</button> */}
      <Hero />
      <ArticleList />
    </div>
  );
};

export default Landing;
