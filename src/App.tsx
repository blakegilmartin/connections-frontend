import { Route, Routes } from "react-router-dom";

import CreatePage from "@/pages/create";
import IndexPage from "@/pages/index";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<CreatePage />} path="/create" />
    </Routes>
  );
}

export default App;
