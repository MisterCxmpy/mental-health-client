import React, { useState } from 'react';
import { Steps } from 'intro.js-react';
import { useNavigate } from 'react-router-dom';
import 'intro.js/introjs.css';

const IntroComponent = ({ onExit }) => {
  const navigate = useNavigate();

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [initialStep, setInitialStep] = useState(0);

  const handleNextStep = () => {
    const nextStep = initialStep + 1;
    setInitialStep(nextStep);

    if (nextStep === steps.length) {
      // All steps completed, disable further steps and navigate to Mindstore page
      setStepsEnabled(false);
      const lastStep = steps[nextStep - 1];
      if (lastStep.element === '#mindstore') {
        navigate('/mindstore'); // Navigate to Mindstore page
      }
    }
  };

  const steps = [
    {
      element: '#home',
      intro: 'This is the Home page.',
      position: 'bottom',
    },
    {
      element: '#my-ai-mentor',
      intro: 'This is the My AIMentor feature.',
      position: 'bottom',
      action: handleNextStep,
    },
    {
      element: '#activities',
      intro: 'Here is another important feature.',
      position: 'top',
      action: handleNextStep,
    },
    {
      element: '#discussions',
      intro: 'Here is another important feature.',
      position: 'top',
      action: handleNextStep,
    },
    {
      element: '#mindstore',
      intro: 'Here is another important feature.',
      position: 'top',
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
      />
    </div>
  );
};

export default IntroComponent;
