"use client";
import React from "react";
import { useTypewriter, Cursor} from 'react-simple-typewriter'

import "./typewriter.css";

const Typewriter = () => {
    const [text] = useTypewriter({
        words: ['Photographer.', 'Adventurer.', 'Conservationist.', 'Artist.', 'Father.', 'Husband.'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 100,
    });

  return (
        <div className="typewriter-container">
            <span className="typewriter-text">
                {text}
            </span>
            <span className="typewriter-cursor">
                <Cursor cursorStyle="|" />
            </span>
        </div>
  );
};

export default Typewriter;
