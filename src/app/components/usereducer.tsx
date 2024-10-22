"use client"

import { useReducer } from 'react';

interface State {
  count: number;
  userInput: string;
  color: boolean;
}

interface Action {
  type: string;
  payload?: string | null; 
}

const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  NEW_USER_INPUT: 'newUserInput',
  TG_COLOR: 'tgColor'
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      return { ...state, userInput: action.payload ?? '' }; 
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

export default function UseReducerComponent() {
  const [state, dispatch] = useReducer(reducer, { count: 0, userInput: '', color: false });

  return (
    <main className="bg-gray-400 flex justify-center flex-col w-[300px] m-auto mt-2 items-center" style={{ color: state.color ? '#FFF' : '#FFF952' }}>
      <input
        type="text"
        className='bg-black'
        value={state.userInput}
        onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })}
      />
      <br /><br />
      <p>{state.count}</p>
      <section className='flex justify-between'>
        <button className="bg-yellow-400 border rounded p-2 w-20" onClick={() => dispatch({ type: ACTION.DECREMENT })}>-</button>
        <button className="bg-green-400 border rounded p-2 w-20" onClick={() => dispatch({ type: ACTION.INCREMENT })}>+</button>
        <button className="bg-blue-400 border rounded p-2 w-20" onClick={() => dispatch({ type: ACTION.TG_COLOR })}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  );
}
