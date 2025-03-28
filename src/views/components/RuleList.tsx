import { useState } from "react";

interface Rule {
  id: number;
  divisor: number;
  replacement: string;
  isActive: boolean;
}

interface RuleListProps {
  rules: Rule[];
  updateRule: (
    id: number,
    divisor: number,
    replacement: string,
    isActive: boolean,
    isDeleted: boolean
  ) => void;
  isGameActive: boolean;
}

function RuleList({ rules, updateRule, isGameActive }: RuleListProps) {
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);
  const [editedDivisor, setEditedDivisor] = useState<number>(0);
  const [editedReplacement, setEditedReplacement] = useState<string>("");

  const handleEditClick = (rule: Rule) => {
    setEditingRuleId(rule.id);
    setEditedDivisor(rule.divisor);
    setEditedReplacement(rule.replacement);
  };

  const handleSaveClick = (id: number) => {
    updateRule(id, editedDivisor, editedReplacement, true, false);
    setEditingRuleId(null);
  };

  const handleCancelClick = () => {
    setEditingRuleId(null);
  };

  return (
    <ul>
      {rules.map((rule) => (
        <li
          key={rule.id}
          className="text-gray-700 my-1 flex items-center gap-2"
        >
          {editingRuleId === rule.id && !isGameActive ? (
            <>
              <input
                type="number"
                value={editedDivisor}
                onChange={(e) => setEditedDivisor(parseInt(e.target.value))}
                className="border p-1 w-20"
                disabled={isGameActive}
              />
              <input
                type="text"
                value={editedReplacement}
                onChange={(e) => setEditedReplacement(e.target.value)}
                className="border p-1"
                disabled={isGameActive}
              />
              <button
                className="px-2 py-1 bg-green-500 text-white rounded-xl"
                onClick={() => handleSaveClick(rule.id)}
                disabled={isGameActive}
              >
                Save
              </button>
              <button
                className="px-2 py-1 bg-gray-500 text-white rounded-xl"
                onClick={handleCancelClick}
                disabled={isGameActive}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <span>
                {rule.isActive
                  ? `${rule.divisor} -> ${rule.replacement}`
                  : `(Disabled) ${rule.divisor} -> ${rule.replacement}`}
              </span>

              <button
                className={`px-2 py-1 text-white rounded-xl ${
                  isGameActive
                    ? "bg-gray-500 cursor-not-allowed"
                    : rule.isActive
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
                onClick={() =>
                  updateRule(
                    rule.id,
                    rule.divisor,
                    rule.replacement,
                    !rule.isActive,
                    false
                  )
                }
                disabled={isGameActive}
              >
                {rule.isActive ? "Disable" : "Enable"}
              </button>

              {rule.isActive && (
                <>
                  <button
                    className={`px-2 py-1 text-white rounded-xl ${
                      isGameActive
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-yellow-500"
                    }`}
                    onClick={() => handleEditClick(rule)}
                    disabled={isGameActive}
                  >
                    Edit
                  </button>
                </>
              )}
              <button
                className={`px-2 py-1 text-white rounded-xl ${
                  isGameActive ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
                }`}
                onClick={() =>
                  updateRule(
                    rule.id,
                    rule.divisor,
                    rule.replacement,
                    false,
                    true
                  )
                }
                disabled={isGameActive}
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default RuleList;
