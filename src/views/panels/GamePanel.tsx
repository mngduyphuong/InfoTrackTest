import { useState } from "react";
import axios from "axios";
import GameControls from "../components/GameControl";
import GameInput from "../components/GameInput";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
interface GamePanelProps {
  setIsGameActive: (isActive: boolean) => void;
  isGameActive: boolean;
}

function GameScreen({ setIsGameActive, isGameActive }: GamePanelProps) {
  const [number, setNumber] = useState<number | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [numbersPlayed, setNumbersPlayed] = useState(0);
  const [totalGuesses, setTotalGuesses] = useState(0);

  const startGame = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/start`);
      setNumber(response.data.number);
      setResult(null);
      setIsGameActive(true);
      setNumbersPlayed(1);
      setTotalGuesses(0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResult(error.response?.data || "Failed to start the game.");
      } else {
        setResult("An unknown error occurred");
      }
    }
  };

  function stopGame() {
    setIsGameActive(false);
    setResult(null);
  }

  const getNextNumber = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/game/number`);
      setNumber(response.data);
      setNumbersPlayed((prev) => prev + 1); // Increment numbers played
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResult(error.response?.data || "Failed to fetch next number.");
      } else {
        setResult("An unknown error occurred");
      }
    }
  };

  const submitAnswer = async () => {
    if (number === null) return;
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/validate`, {
        number,
        answer: input,
      });
      setResult(response.data);
      setTotalGuesses((prev) => prev + 1);
      getNextNumber();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResult(error.response?.data || "Failed to validate answer.");
      } else {
        setResult("An unknown error occurred");
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">FizzBuzz Game</h1>
      <GameControls
        isGameActive={isGameActive}
        startGame={startGame}
        stopGame={stopGame}
      />
      {isGameActive ? (
        <div>
          <p className="text-lg">Number: {number}</p>
          <GameInput
            input={input}
            setInput={setInput}
            submitAnswer={submitAnswer}
          />
        </div>
      ) : (
        numbersPlayed > 0 && (
          <div className="mt-4 p-4 bg-gray-200 rounded-lg">
            <h2 className="text-lg font-bold">Game Stats</h2>
            <p>Numbers Played: {numbersPlayed}</p>
            <p>Total Guesses: {totalGuesses}</p>
          </div>
        )
      )}
      {result && <p className="mt-2 font-bold">{result}</p>}
    </div>
  );
}

export default GameScreen;
