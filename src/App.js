import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import InvitationPage from "./InvitePage";
import AdminPage from "./AdminPage"; // Halaman detail undangan

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/:code" element={<InvitationPage />} />{" "}
        {/* Route dinamis */}
      </Routes>
    </Router>
  );
}

export default App;
