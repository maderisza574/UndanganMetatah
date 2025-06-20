// Tambahkan pada bagian atas file
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { supabase } from "./supabaseClient";

function InvitationPage() {
  const { code } = useParams();
  const [nama, setNama] = useState("");
  const [pesan, setPesan] = useState("");
  const [ucapanList, setUcapanList] = useState([]);
  const [namaHadir, setNamaHadir] = useState("");
  const [status, setStatus] = useState("");
  const penutupRef = useRef(null);
  const isPenutupInView = useInView(penutupRef, { once: true });

  const RowItem = ({ label, value }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 8,
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      <div style={{ minWidth: 100 }}>{label}</div>
      <div style={{ flex: 1 }}>: {value}</div>
    </div>
  );

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
      fetchUcapan();
    }
  };

  // Refs dan animasi untuk scroll
  const reservasiRef = useRef(null);
  const isReservasiInView = useInView(reservasiRef, {
    once: true,
    margin: "-100px",
  });

  const ucapanRef = useRef(null);
  const isUcapanInView = useInView(ucapanRef, { once: true, margin: "-100px" });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #EDE8D0, #C9C5B1)",
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
        <motion.img
          src="/swastika12.png"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          alt="Swastika"
          style={{ width: "80px" }}
        />

        <div
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            color: "#222",
          }}
        >
          <motion.img
            src="/swasty.png"
            alt="Om Swastyastu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            style={{ width: "150px", marginBottom: "10px" }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "24px",
              color: "black",
              marginTop: "0",
              marginBottom: "20px",
            }}
          >
            Om Swastyastu
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: "15px",
              marginBottom: "18px",
              lineHeight: "1.6",
            }}
          >
            Atas asung kertha wara nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang
            Maha Esa, kami mengundang bapak/ibu/saudara/i pada acara mepandes (
            potong gigi) putra/i kami:
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: "12px 0",
            }}
          >
            KADEK WULAN PUSPANINGRAT
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: "12px",
              color: "#222",
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            GEDE AGUS KUSUMANINGRAT
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              fontSize: "12px",
              color: "#222",
              fontWeight: "bold",
              fontFamily: "Georgia, serif",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            GEDE RIKSEN SURYANINGRAT
          </motion.p>
        </div>

        {/* DOA */}
        <div
          style={{
            backgroundImage: "url('/oldpaper.jpg')", // pastikan file ada di folder public
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            padding: "30px 20px",
            borderRadius: "12px",
            marginTop: "30px",
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

        {/* RESEPSI MEPADES */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          style={{
            backgroundColor: "#787569",
            padding: "20px",
            borderRadius: "12px",
            color: "#fff",
            marginTop: "30px",
          }}
        >
          <h3
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "28px",
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            Resepsi Mepandes
          </h3>

          <div style={{ fontSize: 14, textAlign: "center" }}>
            <p style={{ margin: "10px 0" }}>
              Merupakan suatu kehormatan bagi kami sekeluarga apabila bapak/ibu/
              saudara/i berkenan hadir pada acara kami yang akan diselenggarakan
              pada:
            </p>

            <div style={{ maxWidth: 300, margin: "0 auto", textAlign: "left" }}>
              <RowItem label="Hari/Tanggal" value="Rabu, 2 Juli 2025" />
              <RowItem label="Jam" value="12.00 WITA - selesai" />
              <RowItem label="Alamat" value="Jln Pahlawan No 16, Tabanan" />
            </div>
          </div>

          {/* Google Maps Embed */}
          <iframe
            title="Lokasi Resepsi"
            src="https://maps.google.com/maps?q=-8.538973,115.131152&z=17&output=embed"
            width="100%"
            height="200"
            style={{
              border: "0",
              borderRadius: "8px",
              margin: "20px 0 10px 0",
            }}
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
        </motion.div>
        {/* RESERVASI KEHADIRAN */}
        <motion.div
          ref={reservasiRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isReservasiInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
        </motion.div>
        {/* KIRIM UCAPAN */}
        <motion.div
          ref={ucapanRef}
          initial={{ opacity: 0, y: 50 }}
          animate={isUcapanInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
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
        </motion.div>
        <motion.div
          ref={penutupRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isPenutupInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            style={{
              fontSize: "15px",
              marginBottom: "18px",
              lineHeight: "1.6",
            }}
          >
            Atas kehadiran dan doanya, kami sekeluarga mengucapkan banyak
            terimakasih.
          </p>

          <img
            src="/shanthi.png"
            alt="Om Shanthi"
            style={{
              width: "250px",
            }}
          />

          <p
            style={{
              fontFamily: "'Great Vibes', cursive",
              fontSize: "24px",
              color: "black",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            Om Shanti, Shanti, Shanti Om
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default InvitationPage;
