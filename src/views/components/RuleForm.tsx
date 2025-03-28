interface RuleFormProps {
  newRule: {
    divisor: number;
    replacement: string;
    isActive: boolean;
    isDeleted: boolean;
  };
  setNewRule: React.Dispatch<
    React.SetStateAction<{
      divisor: number;
      replacement: string;
      isActive: boolean;
      isDeleted: boolean;
    }>
  >;
  addRule: () => void;
  isGameActive: boolean;
}

function RuleForm({
  newRule,
  setNewRule,
  addRule,
  isGameActive,
}: RuleFormProps) {
  return (
    <div>
      <input
        type="number"
        name="divisor"
        placeholder="Divisor"
        className="border p-2 mr-2 my-2"
        value={newRule.divisor}
        onChange={(e) =>
          setNewRule({ ...newRule, divisor: parseInt(e.target.value) })
        }
      />
      <input
        type="text"
        name="replacement"
        placeholder="Replacement"
        className="border p-2 mr-2 my-2"
        value={newRule.replacement}
        onChange={(e) =>
          setNewRule({ ...newRule, replacement: e.target.value })
        }
      />
      <button
        className={`px-4 py-2 text-white rounded-xl ${
          isGameActive ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500"
        }`}
        onClick={addRule}
        disabled={isGameActive}
      >
        Add Rule
      </button>
    </div>
  );
}

export default RuleForm;
