import { useState } from "react";
// REQUIREMENTS: take in an initial mode

//custom hook that allows to manage the visual mode of any component
// 1. takes in an initial mode
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial); //2. sets mode state with using initial mode provided
  const [history, setHistory] = useState([initial]);

  //transition to a new component mode
  function transition(updatedMode, replace) {
    setMode(updatedMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), updatedMode]);
    } else {
      setHistory((prev) => [...prev, updatedMode]);
    }
  }
  //allows to go back to the previous state based on history state and set the mode to that previous state referenced
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prev) => [...prev.slice(0, -1)]);
    }
  }
  // return an object with a mode property
  return { mode, transition, back }; //returns mode, transition state and back state
}
