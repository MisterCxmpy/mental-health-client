import React, { useEffect, useState } from 'react';
import { Steps } from 'intro.js-react';
import 'intro.js/introjs.css';
import { useNavigate } from 'react-router-dom';

const AIMentorIntro = ({ onExit }) => {

  const navigate = useNavigate()

  const [stepsEnabled, setStepsEnabled] = useState(true);
  const [loading, setLoading] = useState(false)

  const steps = [
    {
      element: '._user-message_14aas_58', // Target the first item in the marketplace list
      intro: 'This is your chat field, here you will see the messages you send.',
      position: 'bottom',
      disableInteraction: true,
    },
    {
      element: '#input-field', // Target the first item in the marketplace list
      intro: 'This is the input bar where you will be able to create your messages.',
      position: 'top',
      disableInteraction: true,
    },
    {
      element: '#menu-btn', // Target the first item in the marketplace list
      intro: `
      <video src="https://cdn.discordapp.com/attachments/1080425253030862849/1105963273410596885/8fd450807dea29025a486655c147782a_online-video-cutter.com.mp4" style="border-radius: 6px;" loop autoplay></video>
      <p>This is the mentor selector, here you will be able to see all of the mentors that you own.</p>
      `,
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
        // onComplete={() => navigate("/my-ai-mentor")}
        options={{ hideNext: false }}
      /> : null}
    </div>
  );
};

export default AIMentorIntro;
