"use client";
import React from "react";
import { useTypewriter, Cursor} from 'react-simple-typewriter'

const Typewriter = () => {
    const [text] = useTypewriter({
        words: ['Photographer.', 'Artist.', 'Naturalist.', 'Car Enthusiast.', 'Father.'],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 100,
    });

  return (
        <h1 style={{margin: '50px', fontSize:'6rem'}}>
            {' '}
            <span style={{fontWeight: 'normal', color: '#ef983f'}}>
                {text}
            </span>
            <span style={{color: '#ef983f'}}>
                <Cursor cursorStyle="|" />
            </span>
        </h1>
  );
};

export default Typewriter;
