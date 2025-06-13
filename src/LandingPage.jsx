import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function LandingPage() {
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const codeParam = params.get("to");
    setCode(codeParam);

    const fetchGuest = async () => {
      if (!codeParam) return;

      const { data } = await supabase
        .from("guests")
        .select("name")
        .eq("invitation_code", codeParam)
        .single();

      if (data) {
        setGuestName(data.name);
      }
    };

    fetchGuest();
  }, []);

  const handleOpenInvitation = () => {
    const audio = new Audio("/gamelanbali.mp3");
    audio.play().catch((e) => console.log("Autoplay blocked:", e));
    navigate(`/${code}`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EDE8D0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#C9C5B1",
          borderRadius: "12px",
          padding: "20px",
          maxWidth: "500px",
          width: "100%",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1 style={{ fontSize: "22px", marginBottom: "10px", color: "#333" }}>
          Undangan Upacara Manusa Yadnya
        </h1>
        <img
          src="/omlogo.png"
          alt="Ornamen Bali"
          style={{ width: "150px", margin: "20px 0" }}
        />

        <h2 style={{ fontSize: "20px", margin: "10px 0", color: "#555" }}>
          Potong Gigi / Mepandes
        </h2>
        <p style={{ fontSize: "16px", color: "#555" }}>Kepada Yth.</p>
        <h2 style={{ fontSize: "18px", color: "#000" }}>
          {guestName || "Tamu Undangan"}
        </h2>

        <p style={{ fontSize: "16px", marginTop: "10px", color: "#555" }}>
          Tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda untuk
          menghadiri acara kami.
        </p>

        <button
          onClick={handleOpenInvitation}
          style={{
            padding: "12px 24px",
            fontSize: "16px",
            backgroundColor: "#787569",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            marginTop: "20px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "250px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          Buka Undangan
        </button>

        <p style={{ marginTop: "30px", fontSize: "14px", color: "#888" }}>
          Mohon maaf apabila ada kesalahan penulisan nama/gelar
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
