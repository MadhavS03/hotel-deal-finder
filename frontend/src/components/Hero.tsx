import { useEffect } from "react";

const Hero = () => {
  useEffect(() => {
    const paragraph = document.querySelector(".typing-effect");
    if (!paragraph) return;
  
    const text = "Search low prices on hotels for your dream vacation...";
    let index = 0;
  
    paragraph.textContent = '';
  
    const typingInterval = setInterval(() => {
      paragraph.textContent += text[index];
      index++;
  
      if (index === text.length) {
        clearInterval(typingInterval);
      }
    }, 60); // Decreased interval for a smoother effect
  
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="bg-orange-500 pb-16">
      <div className="container mx-auto flex flex-col gap-2">
        <h1
          className="text-5xl text-white font-bold"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Find your next stay
        </h1>
        <p
          className="text-2xl text-white typing-effect"
          style={{
            fontFamily: "'Inter', sans-serif",
            overflow: "hidden",
            whiteSpace: "nowrap",
            animation: "typing 2.5s steps(40, end), blink-caret 0.75s step-end infinite",
          }}
        ></p>
      </div>
    </div>
  );
};

export default Hero;
