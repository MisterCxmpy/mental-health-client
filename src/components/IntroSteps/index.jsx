import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import { useNavigate } from 'react-router-dom';
import 'intro.js/introjs.css';

const IntroComponent = ({ onExit }) => {
  const navigate = useNavigate();

  const [stepsEnabled, setStepsEnabled] = useState(true);

  const steps = [
    {
      element: '#home',
      intro: 'Here is the home page, you can see your progress and your goals here',
      position: 'bottom',
      disableInteraction: true,
    },
    {
      element: '#my-ai-mentor',
      intro: 'Your AI buddies can be found here, they are always happy to provide a safe space!',
      position: 'bottom',
      disableInteraction: true,
    },
    {
      element: '#activities',
      intro: 'This is the activities page, here you can find activities to help you on your journey to a better you',
      position: 'top',
      disableInteraction: true,
    },
    {
      element: '#discussions',
      intro: 'This is the discussion forum, here you can talk to other users about your goals and how you are doing',
      position: 'top',
      disableInteraction: true,
    },
    {
      element: '#mindstore',
      intro: 'And finally our final stop, the shop! Here you can buy items to help you on your road to success!',
      position: 'top',
      disableInteraction: true,
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
        options={{ hideNext: false, exitOnOverlayClick: false, exitOnEsc: false
        }}
      />
    </div>
  );
};

export default IntroComponent;
