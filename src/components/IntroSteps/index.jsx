import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import { useNavigate } from 'react-router-dom';
import 'intro.js/introjs.css';

const IntroComponent = ({ onExit }) => {
  const navigate = useNavigate();

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [done, setDone] = useState(false);

  const handleNextStep = () => {
    setDone(true)
  };

  const steps = [
    {
      element: '#home',
      intro: 'This is the home page, here you can see your long term goals and daily goals',
      position: 'bottom'
    },
    {
      element: '#my-ai-mentor',
      intro: 'This is the My AIMentor feature.',
      position: 'bottom'
    },
    {
      element: '#activities',
      intro: 'Here is another important feature.',
      position: 'top'
    },
    {
      element: '#discussions',
      intro: 'Here is another important feature.',
      position: 'top'
    },
    {
      element: '#mindstore',
      intro: 'Here is another important feature.',
      position: 'top'
    }
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
        initialStep={0}
        onExit={handleExitIntro}
        onComplete={() => navigate("/mindstore")}
        options={{ hideNext: false }}
      />
    </div>
  );
};

export default IntroComponent;
