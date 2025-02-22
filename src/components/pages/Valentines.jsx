import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  height: 100vh;
  background-color: #fff0f3;
  padding: 20px;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  box-sizing: border-box;
`;

const Message = styled.div`
  font-size: 1.5rem;
  margin: 10px;
  padding: 15px 25px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  opacity: ${props => props.visible ? 1 : 0};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.5s ease;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const SpecialMessage = styled(Message)`
  background-color: #ffb6c1;
  font-weight: bold;
  color: #000000;
`;

const RestartButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  background-color: #ff69b4;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-top: 30px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
  animation: fadeIn 1s ease-out;

  &:hover {
    transform: scale(1.05);
    background-color: #ff1493;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

const TypingText = styled.div`
  flex-grow: 1;
  color: #000000;
  min-height: 24px;
`;

const TypewriterCursor = styled.span`
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: #000;
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    50% { opacity: 0; }
  }
`;

const MessageInput = styled.div`
  width: 80%;
  max-width: 500px;
  padding: 15px;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  gap: 10px;
  align-items: center;
  animation: fadeIn 1s ease-out;
`;

const InputText = styled.div`
  flex-grow: 1;
  color: #000000;
`;

const SendButton = styled.button`
  padding: 8px 15px;
  background-color: #e0e0e0;
  border: none;
  border-radius: 8px;
  color: #999;
  cursor: not-allowed;
`;

const SimpleText = styled.div`
  font-size: 1.5rem;
  margin: 10px;
  color: #000000;
  animation: fadeIn 1s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SpecialWord = styled.span`
  background-color: #ffb6c1;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 10px;
  color: #000000;
`;

const GifContainer = styled.div`
  width: 300px;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  animation: fadeIn 1s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const FloatingHeart = styled.div`
  position: fixed;
  font-size: 24px;
  animation: float 4s linear infinite;
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  opacity: 0;

  @keyframes float {
    0% {
      transform: translateY(100vh);
      opacity: 1;
    }
    100% {
      transform: translateY(-100px);
      opacity: 0;
    }
  }
`;

const PlayMusicButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background: rgba(255, 105, 180, 0.8);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Hearts = () => {
  return Array.from({ length: 40 }).map((_, index) => (
    <FloatingHeart
      key={index}
      left={Math.random() * 100}
      delay={Math.random() * 4}
    >
      {['❤️', '💖', '💝', '💕', '💗'][Math.floor(Math.random() * 5)]}
    </FloatingHeart>
  ));
};

const Valentines = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [typedText, setTypedText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio('/earfquake.mp3'));
  const messages = [
    "Coucou ma chérie !",
    "C'est la Saint-Valentin ! 💝",
    "Je voulais faire quelque chose de simple...",
    "Joyeuse Saint-Valentin ! ❤️",
    "Mais je me suis arrêté(e)",
    "Car je voulais faire quelque chose de spécial",
    "Parce que...",
    "Tu es spéciale ✨",
    "Alors...",
    "Joyeuse Saint-Valentin ! ❤️ Merci de de m'accompagner dans ma vie. Je t'aime."
  ];

  useEffect(() => {
    const audio = new Audio('/earfquake.mp3');
    audioRef.current = audio;
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    audio.addEventListener('error', (e) => {
      console.error('Erreur de chargement audio:', e);
    });

    return () => {
      audio.pause();
      audio.remove();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Erreur lors de la lecture:", error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (currentStep < messages.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 4) {
      const text = " Joyeuse Saint-Valentin ! Tu es";
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setTypedText(prev => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100); // Vitesse de frappe

      return () => {
        clearInterval(timer);
        setTypedText('');
      };
    }
  }, [currentStep]);

  const handleRestart = () => {
    setCurrentStep(1);
    // Redémarrer la musique
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  };

  return (
    <Container>
      <PlayMusicButton onClick={toggleMusic}>
        {isPlaying ? '🔇' : '🔊'}
      </PlayMusicButton>
      {currentStep === 1 && <SimpleText>Coucou ma chérie !</SimpleText>}
      {currentStep === 2 && <SimpleText>C'est la Saint-Valentin ! 💝</SimpleText>}
      {currentStep === 3 && <SimpleText>Je voulais faire quelque chose de simple...</SimpleText>}
      {currentStep === 4 && (
        <MessageInput>
          <TypingText>
            {typedText}
            <TypewriterCursor />
          </TypingText>
          <SendButton disabled>Envoyer</SendButton>
        </MessageInput>
      )}
      {currentStep === 5 && <SimpleText>Mais je me suis arrêté</SimpleText>}
      {currentStep === 6 && <SimpleText>Car je voulais faire quelque chose de spécial</SimpleText>}
      {currentStep === 7 && <SimpleText>Parce que...</SimpleText>}
      {currentStep === 8 && (
        <SimpleText>
          Tu es <SpecialWord>spéciale</SpecialWord> ✨
        </SimpleText>
      )}
      {currentStep === 9 && <SimpleText>Alors...</SimpleText>}
      {currentStep === 10 && (
        <>
          <Hearts />
          <GifContainer>
            <img 
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMXJ1MGg3emZsYnhxczB4Z3g2OWlzOGZtcW91enl1dWEzZ2t1eWd0ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nPUKkFPBXjNPG/giphy.gif"
              alt="Valentine's GIF"
            />
          </GifContainer>
          <SimpleText>
            Joyeuse Saint-Valentin ! ❤️
          </SimpleText>
          <SimpleText>
            Merci de m'accompagner dans ma vie. Je t'aime.
          </SimpleText>
          <RestartButton onClick={handleRestart}>
            Recommencer 💝
          </RestartButton>
        </>
      )}
    </Container>
  );
};

export default Valentines;
