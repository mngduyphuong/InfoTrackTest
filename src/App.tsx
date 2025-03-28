import { useState } from "react";
import GamePanel from "./views/panels/GamePanel";
import AdminPanel from "./views/panels/AdminPanel";
import WebHeader from "./views/components/Header";
import WebFooter from "./views/components/Footer";

function App() {
  const [isGameActive, setIsGameActive] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <WebHeader />
      <div className="flex-grow">
        <GamePanel
          setIsGameActive={setIsGameActive}
          isGameActive={isGameActive}
        />
        <AdminPanel isGameActive={isGameActive} />
      </div>
      <WebFooter />
    </div>
  );
}

export default App;
