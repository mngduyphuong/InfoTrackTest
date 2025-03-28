interface GameControlsProps {
  isGameActive: boolean;
  startGame: () => void;
  stopGame: () => void;
}

function GameControls({
  isGameActive,
  startGame,
  stopGame,
}: GameControlsProps) {
  return (
    <div className="mt-2">
      <button
        className={`px-4 py-2 text-white rounded-xl ${
          isGameActive ? "bg-red-500" : "bg-blue-500"
        }`}
        onClick={isGameActive ? stopGame : startGame}
      >
        {isGameActive ? "Stop Game" : "Start Game"}
      </button>
    </div>
  );
}

export default GameControls;
