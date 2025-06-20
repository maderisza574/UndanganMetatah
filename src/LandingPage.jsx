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
        backgroundImage: "url('/background-bali-pattern.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#f3f2ed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Playfair Display', serif",
        textAlign: "center",
        transition: "all 0.3s ease-in-out",
      }}
    >
      {/* Load Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;700&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderRadius: "16px",
          padding: "30px",
          maxWidth: "520px",
          width: "100%",
          boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
          backdropFilter: "blur(8px)",
        }}
      >
        <h1
          style={{
            fontSize: "26px",
            marginBottom: "8px",
            color: "#5D3A00",
            fontWeight: "700",
          }}
        >
          Undangan Upacara Manusa Yadnya
        </h1>
        <img
          src="/swastika12.png"
          alt="Ornamen Bali"
          style={{ width: "140px", margin: "20px 0" }}
        />

        <h2 style={{ fontSize: "22px", margin: "10px 0", color: "#333" }}>
          Potong Gigi / Mepandes
        </h2>
        <p style={{ fontSize: "16px", color: "#4A4A4A" }}>Kepada Yth.</p>
        <h2 style={{ fontSize: "20px", color: "#000", marginTop: "5px" }}>
          {guestName || "Tamu Undangan"}
        </h2>

        <p
          style={{
            fontSize: "16px",
            marginTop: "12px",
            color: "#555",
            lineHeight: "1.5",
          }}
        >
          Dengan segala hormat, kami mengundang Anda untuk hadir dalam acara
          sakral kami.
        </p>

        <button
          onClick={handleOpenInvitation}
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            background: "linear-gradient(135deg, #b2894b, #6e5e3e)",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            marginTop: "24px",
            cursor: "pointer",
            width: "100%",
            maxWidth: "260px",
            transition: "0.3s",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
          }}
        >
          Buka Undangan
        </button>

        <p
          style={{
            marginTop: "30px",
            fontSize: "13px",
            color: "#777",
            fontStyle: "italic",
          }}
        >
          Mohon maaf apabila terdapat kesalahan penulisan nama/gelar.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
