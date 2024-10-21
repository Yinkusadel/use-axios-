"use client"

import { useState, useRef } from 'react';

export default function UseRefComponent() {
    const [randomInput, setRandomInput] = useState('');
    const [seconds, setSeconds] = useState(0);
    const renders = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const timerId = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRandomInput(e.target.value);
        renders.current++;
    };

    const startTimer = () => {
        timerId.current = setInterval(() => {
            renders.current++;
            setSeconds((prev) => prev + 1);
        }, 1000);
        inputRef.current?.focus();
    };

    const stopTimer = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
            timerId.current = undefined;
        }
        inputRef.current?.focus();
    };

    const resetTimer = () => {
        stopTimer();
        if (seconds) {
            renders.current++;
            setSeconds(0);
        }
        inputRef.current?.focus();
    };

    return (
        <main className="flex items-center flex-col">
            <div className='flex flex-col items-center bg-gray-400 w-[400px] h-48 justify-center mt-4'>
            <input
                ref={inputRef}
                type="text"
                value={randomInput}
                placeholder="Random Input"
                onChange={handleChange}
            />
            <p className='font-bold mt-2'>Renders: {renders.current}</p>
            </div>
            <br /><br />
            <section className='justify-center flex'>
                <div className='flex justify-between w-[500px] '>
                    <button className='p-2 border bg-blue-500  px-4 rounded' onClick={startTimer}>Start</button>
                    <button className='p-2 border bg-red-500  px-4 rounded' onClick={stopTimer}>Stop</button>
                    <button className='p-2 border bg-purple-500 px-4 rounded' onClick={resetTimer}>Reset</button>
                </div>
            </section>
            <br /><br />
            <p className='font-bold mt-2'>Seconds: {seconds}</p>
            <br /><br />
            <p>{randomInput}</p>
        </main>
    );
}
