import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Orders from "./pages/Orders";
import { Homepage } from "./pages/Homepage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={Homepage} />
          <Route path="/orders/:pageNumber?" Component={Orders} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
