import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { useNavigate } from 'react-router-dom';

const MindStoreIntroComponent = ({ onExit }) => {

  const navigate = useNavigate()

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      element: '#Morgan', // Target the first item in the marketplace list
      intro: 'This is the first item in the Mind Store.',
      position: 'bottom',
      disableInteraction: true,
      
    },
    {
      element: '#Morgan button', // Target the buy button of the first item
      intro: 'Click here to buy the item.',
      position: 'bottom',
    },
    {
      element: '#my-ai-mentor',
      intro: 'Head over to the AIMentor to chat to your mentor!',
      position: 'bottom',
      disableInteraction: true,
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
        onComplete={() => navigate("/my-ai-mentor")}
        options={{ hideNext: false }}
      /> : null}
    </div>
  );
};

export default MindStoreIntroComponent;
