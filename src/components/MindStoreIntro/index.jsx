import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

const MindStoreIntroComponent = ({ onExit }) => {
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);

  const handleNextStep = () => {
    const nextStep = initialStep + 1;
    setInitialStep(nextStep);

    if (nextStep === steps.length) {
      // All steps completed, disable further steps and exit the intro
      setStepsEnabled(false);
      if (onExit) {
        onExit(); // Call the onExit callback if provided
      }
    }
  };

  const steps = [
    {
      element: '#card-1', // Target the first item in the marketplace list
      intro: 'This is the first item in the Mind Store.',
      position: 'bottom',
      action: handleNextStep,
    },
    {
      element: '#card-1 button', // Target the buy button of the first item
      intro: 'Click here to buy the item.',
      position: 'bottom',
      action: handleNextStep,
    },
  ];

  const handleExitIntro = () => {
    setStepsEnabled(false);
    if (onExit) {
      onExit(); // Call the onExit callback if provided
    }
  };

  

  return (
    <div>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={handleExitIntro}
        onChange={handleStepChange}
      />
    </div>
  );
};

export default MindStoreIntroComponent;
