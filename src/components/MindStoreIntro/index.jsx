import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';

const MindStoreIntroComponent = ({ onExit }) => {
  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      element: '#Morgan', // Target the first item in the marketplace list
      intro: 'This is the first item in the Mind Store.',
      position: 'bottom'
    },
    {
      element: '#Morgan button', // Target the buy button of the first item
      intro: 'Click here to buy the item.',
      position: 'bottom'
    },
    {
      element: '#my-ai-mentor',
      intro: 'This is the My AIMentor feature.',
      position: 'bottom'
    }
  ];

  const handleExitIntro = () => {
    setStepsEnabled(false);
    if (onExit) {
      onExit(); // Call the onExit callback if provided
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 500);
  }, [])

  return (
    <div>
      {loading ? <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={0}
        onExit={handleExitIntro}
        options={{ hideNext: false }}
      /> : null}
    </div>
  );
};

export default MindStoreIntroComponent;
