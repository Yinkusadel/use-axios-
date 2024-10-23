"use client";
import { useEffect, useRef, useState } from 'react';

export default function UseLayoutEffectComponent() {
  const [number, setNumber] = useState(0);
  const [sectionStyle, setSectionStyle] = useState({});
  const sectionRef = useRef<HTMLElement | null>(null); // Specify the type here

  // Change to useLayoutEffect to see the difference you will need to import it
  useEffect(() => {
    const random = Math.floor(Math.random() * 500);

    /* loop is just to make the changes in this example slow enough to be observable */
    for (let i = 0; i <= 100000000; i++) {
      if (i === 100000000) setSectionStyle({ paddingTop: `${random}px` });
    }
  }, [number]);

  return (
    <main className="bg-gray-300 flex justify-center items-center">
      <section ref={sectionRef} style={sectionStyle}>
        <p>{number}</p>
        <div className='flex'>
          <button className="bg-blue-400 border rounded p-2 w-20" onClick={() => setNumber(prev => prev - 1)}>-</button>
          <button className="bg-green-400 border rounded p-2 w-20" onClick={() => setNumber(prev => prev + 1)}>+</button>
        </div>
      </section>
    </main>
  );
}
