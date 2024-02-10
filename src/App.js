import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./pages/UserList";
import UserDetails from "./pages/UserDetail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
