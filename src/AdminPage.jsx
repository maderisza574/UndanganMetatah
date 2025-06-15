import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    invitation_code: "",
    group_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");
    setGeneratedLink("");

    const { error } = await supabase.from("guests").insert([
      {
        name: form.name.trim(),
        invitation_code: form.invitation_code.trim(),
        group_name: form.group_name,
      },
    ]);

    setLoading(false);

    if (error) {
      setErrorMsg("Gagal menambahkan tamu: " + error.message);
    } else {
      setSuccessMsg("Tamu berhasil ditambahkan!");
      const url =
        window.location.origin + `/?to=${form.invitation_code.trim()}`;
      setGeneratedLink(url);
      setForm({
        name: "",
        invitation_code: "",
        group_name: "",
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
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <p>
            Link Undangan:{" "}
            <a href={generatedLink} target="_blank" rel="noopener noreferrer">
              {generatedLink}
            </a>
          </p>
          <button
            onClick={handleCopyLink}
            style={{
              marginTop: "8px",
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
        </div>
      )}
    </div>
  );
}
