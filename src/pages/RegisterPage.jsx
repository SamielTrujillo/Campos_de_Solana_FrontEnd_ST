import { useState } from "react";

export default function RegisterPage({ onRegister, setPage, users, showToast }) {
// ─── REGISTER ────────────────────────────────────────────────────────────────
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", phone: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "El nombre es obligatorio.";
    if (!form.email.trim()) e.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Correo no válido.";
    else if (users.find(u => u.email === form.email)) e.email = "Este correo ya está registrado.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres.";
    if (form.password !== form.confirm) e.confirm = "Las contraseñas no coinciden.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const newUser = { id: Date.now(), name: form.name, email: form.email, password: form.password, phone: form.phone, role: "client", createdAt: new Date().toISOString() };
    onRegister(newUser);
    showToast("Cuenta creada con éxito. Bienvenido.", "success");
  };

  const field = (key, label, type = "text", placeholder = "") => (
    <div className="field">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} value={form[key]} onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors({}); }} />
      {errors[key] && <span className="error">{errors[key]}</span>}
    </div>
  );

  return (
    <div className="page-enter" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "52px 48px", maxWidth: 460, width: "100%", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>Únete a nosotros</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, fontWeight: 300, color: "var(--wine)" }}>Crear Cuenta</h2>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "12px auto 0" }} />
        </div>

        {field("name", "Nombre completo", "text", "Ana García")}
        {field("email", "Correo electrónico", "email", "tu@correo.com")}
        {field("phone", "Teléfono (opcional)", "tel", "+34 600 000 000")}
        {field("password", "Contraseña", "password", "••••••••")}
        {field("confirm", "Confirmar contraseña", "password", "••••••••")}

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>
          Crear cuenta
        </button>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          ¿Ya tienes cuenta?{" "}
          <button onClick={() => setPage("login")} style={{ background: "none", border: "none", color: "var(--wine)", cursor: "pointer", fontWeight: 500 }}>Inicia sesión</button>
        </div>
      </div>
    </div>
  );
}

