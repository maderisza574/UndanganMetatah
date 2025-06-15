import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

function InvitationPage() {
  const { code } = useParams();
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [ucapanList, setUcapanList] = useState([]);
  const [namaHadir, setNamaHadir] = useState("");
  const [status, setStatus] = useState("");

  const fetchUcapan = async () => {
    const { data, error } = await supabase
      .from("ucapan")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setUcapanList(data);
  };

  useEffect(() => {
    fetchUcapan();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama || !pesan) return alert("Isi semua field dulu ya!");

    const { error } = await supabase.from("ucapan").insert({ nama, pesan });
    if (error) {
      alert("Gagal menyimpan ucapan");
      console.error(error);
    } else {
      setNama("");
      setPesan("");
      fetchUcapan(); // refresh daftar ucapan
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#EDE8D0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        fontFamily: "sans-serif",
        textAlign: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#C9C5B1",
          padding: "20px",
          borderRadius: "12px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "32px",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          Mepandes
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: "#222",
            fontWeight: "bold", // Bikin tegas
            fontFamily: "Georgia, serif", // Gunakan font yang bersih dan kuat
            letterSpacing: "1px", // (Opsional) Menambah jarak antar huruf biar makin rapi
            textTransform: "uppercase", // (Opsional) Biar tetap huruf besar semua
          }}
        >
          KADEK WULAN PUSPANINGRAT
        </p>

        <p
          style={{
            marginTop: "20px",
            fontSize: "14px",
            fontWeight: "bold",
            color: "#787569",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Rabu, 02 Juli 2025
        </p>

        {/* DOA */}
        <div
          style={{
            backgroundImage: "url('/oldpaper.jpg')", // pastikan file ada di folder public
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            padding: "30px 20px",
            borderRadius: "12px",
            marginTop: "20px",
            textAlign: "center",
            fontFamily: "'Georgia', serif", // gaya kitab klasik
            color: "#3b2f2f", // warna coklat tua klasik
            fontSize: "16px",
            lineHeight: "1.6",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p>
            Dengan Yadnya, semoga kami memperoleh sifat-sifat kemuliaan,
            kejayaan, kekuatan rokhani, kekuatan jasmani, kesejahteraan dan
            perlindungan.
          </p>
          <p style={{ marginTop: "10px", fontStyle: "italic" }}>
            (Yajurveda XV.113)
          </p>
        </div>
        {/* PEMBUKAAN */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            color: "#222",
          }}
        >
          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            OM SWASTYASTU
          </p>

          <p
            style={{
              fontSize: "15px",
              marginBottom: "10px",
              lineHeight: "1.6",
            }}
          >
            Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa / Tuhan
            Yang Maha Esa, kami bermaksud untuk mengundang Bapak/Ibu/Saudara/i
            untuk hadir pada acara Mepandes / Potong Gigi putri kami:
          </p>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: "12px 0",
            }}
          >
            KADEK WULAN PUSPANINGRAT
          </p>

          <p
            style={{
              fontSize: "13px",
              fontStyle: "italic",
              color: "#444",
              lineHeight: "1.6",
            }}
          >
            Anak kedua dari pasangan:
            <br />
            Bapak I Wayan Gede Dharma Satywan
            <br />& Ibu Ni Putu Hemi Kusumayati, S.H.
          </p>
        </div>
        {/* RESEPSI MEPADES */}
        <div
          style={{
            backgroundColor: "#787569",
            padding: "20px",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "28px",
              marginBottom: "10px",
            }}
          >
            Resepsi Mepandes
          </h3>
          <p style={{ fontSize: "14px" }}>
            Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga,
            apabila Bapak/Ibu/Saudara berkenan hadir dan memberikan doa restu
            kepada putri kami pada:
          </p>
          <p style={{ margin: "10px 0", fontSize: "14px" }}>📍 Lokasi: Rumah</p>

          {/* Maps Embed */}
          <iframe
            title="Lokasi Resepsi"
            src="https://maps.google.com/maps?q=-8.538973,115.131152&z=17&output=embed"
            width="100%"
            height="200"
            style={{ border: "0", borderRadius: "8px", margin: "10px 0" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>

          {/* Tombol Buka Maps */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=-8.538973,115.131152"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#f9c846",
              color: "#333",
              borderRadius: "8px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Buka di Google Maps
          </a>
        </div>
        {/* RESERVASI KEHADIRAN */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
            backgroundColor: "#4F4D46",
            padding: "30px 20px",
            borderRadius: "12px",
          }}
        >
          <h3 style={{ fontSize: "20px", marginBottom: "10px", color: "#fff" }}>
            RESERVASI KEHADIRAN
          </h3>
          <p style={{ fontSize: "14px", marginBottom: "20px", color: "#fff" }}>
            Mohon bantu kami mempersiapkan segalanya dengan lebih baik dengan
            mengisi form di bawah ini
          </p>

          <form
            onSubmit={async (e) => {
              e.preventDefault();

              if (!namaHadir || !status) {
                alert("Mohon isi semua kolom");
                return;
              }

              const { error } = await supabase
                .from("kehadiran")
                .insert([{ nama, status }]);

              if (error) {
                alert("Gagal menyimpan kehadiran.");
                console.error(error);
              } else {
                alert("Terima kasih atas konfirmasi kehadirannya!");
                setNama("");
                setStatus("");
              }
            }}
            style={{
              maxWidth: "400px",
              margin: "0 auto",
              textAlign: "left",
              color: "#fff",
            }}
          >
            {/* Nama */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Nama:
            </label>
            <div style={{ paddingRight: 20 }}>
              <input
                type="text"
                placeholder="Masukkan nama"
                style={{
                  width: "100%",
                  padding: "10px",
                  marginBottom: "20px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                value={namaHadir}
                onChange={(e) => setNamaHadir(e.target.value)}
              />
            </div>

            {/* Kehadiran */}
            <label
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Apakah Anda akan hadir?
            </label>

            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  color: "#fff",
                }}
              >
                <input
                  type="radio"
                  name="kehadiran"
                  value="ya"
                  onChange={() => setStatus("ya")}
                  style={{ marginRight: "10px" }}
                />
                Iya, saya akan hadir
              </label>
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#fff",
                }}
              >
                <input
                  type="radio"
                  name="kehadiran"
                  value="tidak"
                  checked={status === "tidak"}
                  style={{ marginRight: "10px" }}
                />
                Maaf, saya berhalangan hadir
              </label>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#C9C5B1",
                color: "#4F4D46",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Kirim
            </button>
          </form>
        </div>
        {/* KIRIM UCAPAN */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            backgroundColor: "#4F4D46",
            padding: "30px 20px",
            borderRadius: "12px",
            color: "#fff",
          }}
        >
          <h3>KIRIM UCAPAN</h3>
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}
          >
            <label>Nama:</label>
            <div style={{ paddingRight: 20, paddingTop: 10 }}>
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama"
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
              />
            </div>

            <label>Ucapan dan Harapan:</label>
            <div style={{ paddingRight: 20, paddingTop: 10 }}>
              <textarea
                value={pesan}
                onChange={(e) => setPesan(e.target.value)}
                placeholder="Tulis ucapan..."
                rows={4}
                style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#C9C5B1",
                color: "#4F4D46",
                padding: "12px",
                border: "none",
                borderRadius: "8px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Kirim Ucapan
            </button>
          </form>

          {/* List Ucapan */}
          <div
            style={{
              maxWidth: "500px",
              margin: "30px auto 0",
              textAlign: "left",
              maxHeight: "250px",
              overflowY: "auto",
              backgroundColor: "#3F3D36",
              padding: "15px",
              borderRadius: "10px",
            }}
          >
            {ucapanList.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "15px",
                  padding: "10px",
                  backgroundColor: "#5A584F",
                  borderRadius: "8px",
                }}
              >
                <strong>{item.nama}:</strong>
                <p>{item.pesan}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvitationPage;
