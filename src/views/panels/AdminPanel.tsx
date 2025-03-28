import { useState, useEffect } from "react";
import axios from "axios";
import RuleList from "../components/RuleList";
import RuleForm from "../components/RuleForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface AdminPanelProps {
  isGameActive: boolean;
}

function AdminPanel({ isGameActive }: AdminPanelProps) {
  const [rules, setRules] = useState<
    {
      id: number;
      divisor: number;
      replacement: string;
      isActive: boolean;
      isDeleted: boolean;
    }[]
  >([]);
  const [newRule, setNewRule] = useState({
    divisor: 1,
    replacement: "",
    isActive: true,
    isDeleted: false,
  });
  const [result, setResult] = useState<string | null>(null);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/rules`);
    setRules(response.data);
    setResult(null);
  };

  const addRule = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/rules`, newRule);
      fetchRules();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResult(error.response?.data || "An Axios error occurred");
      } else {
        setResult("An unknown error occurred");
      }
    }
  };

  const updateRule = async (
    id: number,
    divisor: number,
    replacement: string,
    isActive: boolean,
    isDeleted: boolean
  ) => {
    await axios.put(`${API_BASE_URL}/api/rules`, {
      id,
      divisor,
      replacement,
      isActive,
      isDeleted,
    });
    fetchRules();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div>
        <h2 className="text-lg font-bold">Add Rule</h2>
        <RuleForm
          newRule={newRule}
          setNewRule={setNewRule}
          addRule={addRule}
          isGameActive={isGameActive}
        />
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4">Existing Rules</h2>
        <RuleList
          rules={rules}
          updateRule={updateRule}
          isGameActive={isGameActive}
        />
      </div>
      <p className="mt-2 font-bold">{result}</p>
    </div>
  );
}

export default AdminPanel;
