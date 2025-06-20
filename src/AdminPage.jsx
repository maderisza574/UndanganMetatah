import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    invitation_code: "",
    group_name: "",
    no_hp: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [savedName, setSavedName] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatPhoneToWa = (input) => {
    let phone = input.trim();
    if (phone.startsWith("0")) {
      phone = "+62" + phone.slice(1);
    } else if (!phone.startsWith("+")) {
      phone = "+62" + phone;
    }
    return phone.replace(/\D/g, ""); // keep only digits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setGeneratedLink("");

    const cleanPhone = formatPhoneToWa(form.no_hp);
    const trimmedCode = form.invitation_code.trim();
    const trimmedName = form.name.trim();

    // Validasi kode sudah ada
    const { data: existingGuest } = await supabase
      .from("guests")
      .select("id")
      .eq("invitation_code", trimmedCode)
      .maybeSingle();

    if (existingGuest) {
      setErrorMsg("Kode undangan sudah digunakan. Harap pilih kode lain.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("guests").insert([
      {
        name: trimmedName,
        invitation_code: trimmedCode,
        group_name: form.group_name,
        no_hp: cleanPhone,
      },
    ]);

    setLoading(false);

    if (error) {
      setErrorMsg("Gagal menambahkan tamu: " + error.message);
    } else {
      setSuccessMsg("Tamu berhasil ditambahkan!");
      const encodedCode = encodeURIComponent(trimmedCode);
      const url = `${window.location.origin}/?to=${encodedCode}`;
      setGeneratedLink(url);
      setFormattedPhone(cleanPhone);
      setSavedName(trimmedName);
      setForm({
        name: "",
        invitation_code: "",
        group_name: "",
        no_hp: "",
      });
    }
  };

  const handleCopyLink = () => {
    if (!generatedLink) return;
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => alert("Link berhasil disalin!"))
      .catch(() => alert("Gagal menyalin link"));
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", padding: "20px" }}>
      <h2>Admin - Tambah Tamu</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "12px" }}>
          <label>Nama:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Kode Undangan (unik):</label>
          <input
            type="text"
            name="invitation_code"
            value={form.invitation_code}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>No. HP:</label>
          <input
            type="text"
            name="no_hp"
            value={form.no_hp}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
            placeholder="contoh: 081234567890"
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Grup:</label>
          <select
            name="group_name"
            value={form.group_name}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">-- Pilih Grup --</option>
            <option value="Teman">Teman</option>
            <option value="Keluarga">Keluarga</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          {loading ? "Menyimpan..." : "Simpan Tamu"}
        </button>
      </form>

      {successMsg && (
        <p style={{ color: "green", marginTop: "10px" }}>{successMsg}</p>
      )}
      {errorMsg && (
        <p style={{ color: "red", marginTop: "10px" }}>{errorMsg}</p>
      )}

      {generatedLink && (
        <div
          style={{
            marginTop: "20px",
            background: "#f1f1f1",
            padding: "12px",
            borderRadius: "8px",
          }}
        >
          <p>
            <strong>Kepada Yth. Saudara:</strong> {savedName}
          </p>
          <p>
            <strong>Link Undangan:</strong>{" "}
            <a href={generatedLink} target="_blank" rel="noopener noreferrer">
              Klik di sini untuk melihat undangan
            </a>
          </p>

          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={handleCopyLink}
              style={{
                padding: "8px 16px",
                backgroundColor: "#666",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Salin Link
            </button>

            <a
              href={`https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                `Kepada Yth.\nBapak/Ibu/Saudara/i ${savedName}\n\n` +
                  `Om Swastyastu,\n\n` +
                  `Atas asung kertha wara nugraha Ida Sang Hyang Widhi Wasa/Tuhan Yang Maha Esa, kami mengundang bapak/ibu/saudara/i pada acara mepandes (potong gigi) putra/i kami:\n\n` +
                  `- Gede Agus Kusumaningrat\n` +
                  `- Kadek Wulan Puspaningrat\n` +
                  `- Gede Riksen Suryaningrat\n\n` +
                  `Merupakan suatu kehormatan bagi kami sekeluarga apabila bapak/ibu/saudara/i berkenan hadir pada acara kami yang akan diselenggarakan pada:\n\n` +
                  `Hari/Tanggal : Rabu, 2 Juli 2025\n` +
                  `Jam          : 12.00 WITA - selesai\n` +
                  `Alamat       : Jln Pahlawan No 16, Tabanan\n\n` +
                  `Berikut link undangannya:\n${generatedLink}\n\n` +
                  `Atas kehadiran dan doanya, kami sekeluarga mengucapkan banyak terima kasih.\n\n` +
                  `Om Santi Santi Santi Om`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "8px 16px",
                backgroundColor: "#25D366",
                color: "#fff",
                borderRadius: "6px",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Kirim via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
