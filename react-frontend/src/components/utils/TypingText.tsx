import React, { useState, useEffect } from "react";

type Props = {
  text: string;
};

const TypingText: React.FC<Props> = ({ text }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextChar = text[currentIndex];
      if (nextChar !== undefined) {
        const updatedText =
          nextChar === "\n" ? currentText + "<br />" : currentText + nextChar;
        setCurrentText(updatedText);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentIndex, currentText, text.length]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: currentText }} />
      <button onClick={() => setCurrentText("")}>reset</button>
    </>
  );
};

export default TypingText;
