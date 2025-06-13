import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import InvitationPage from "./InvitePage"; // Halaman detail undangan

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:code" element={<InvitationPage />} />{" "}
        {/* Route dinamis */}
      </Routes>
    </Router>
  );
}

export default App;
