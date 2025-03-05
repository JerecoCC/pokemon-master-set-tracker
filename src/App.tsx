import "./styles.css";
import SetPage from "./pages/Set";
import SetsPage from "./pages/Sets";
import { Route, Routes } from "react-router";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<SetsPage />} />
        <Route path=":setCode" element={<SetPage />} />
      </Routes>
    </div>
  );
}
