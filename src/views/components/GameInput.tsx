interface GameInputProps {
  input: string;
  setInput: (value: string) => void;
  submitAnswer: () => void;
}

function GameInput({ input, setInput, submitAnswer }: GameInputProps) {
  return (
    <div>
      <input
        type="text"
        className="border p-2"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-green-500 text-white ml-2"
        onClick={submitAnswer}
      >
        Submit Answer
      </button>
    </div>
  );
}

export default GameInput;
