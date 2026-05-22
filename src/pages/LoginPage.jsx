
// ─── LOGIN ───────────────────────────────────────────────────────────────────
import { useState } from "react";
import ADMIN from "../data/admin";
function LoginPage({ onLogin, setPage, users, showToast }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "El correo es obligatorio.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Correo no válido.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    // Check admin
    if (form.email === ADMIN.email && form.password === ADMIN.password) {
      onLogin(ADMIN); showToast("Bienvenido, Administrador", "success"); return;
    }
    // Check users
    const user = users.find(u => u.email === form.email && u.password === form.password);
    if (user) {
      onLogin(user); showToast(`Bienvenido, ${user.name}`, "success");
    } else {
      setErrors({ general: "Correo o contraseña incorrectos." });
    }
  };

  return (
    <div className="page-enter" style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "52px 48px", maxWidth: 420, width: "100%", boxShadow: "var(--shadow-lg)" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 9, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 8 }}>Bienvenido</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 34, fontWeight: 300, color: "var(--wine)" }}>Iniciar Sesión</h2>
          <div style={{ width: 40, height: 1, background: "var(--gold)", margin: "12px auto 0" }} />
        </div>

        {errors.general && (
          <div style={{ background: "rgba(107,31,42,0.08)", border: "1px solid rgba(107,31,42,0.2)", borderRadius: "var(--radius)", padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "var(--wine)" }}>
            {errors.general}
          </div>
        )}

        <div className="field">
          <label>Correo electrónico</label>
          <input type="email" placeholder="tu@correo.com" value={form.email} onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors({}); }} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e => { setForm(f => ({ ...f, password: e.target.value })); setErrors({}); }} onKeyDown={e => e.key === "Enter" && handleSubmit()} />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={handleSubmit}>
          Entrar
        </button>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
          ¿No tienes cuenta?{" "}
          <button onClick={() => setPage("register")} style={{ background: "none", border: "none", color: "var(--wine)", cursor: "pointer", fontWeight: 500 }}>Regístrate</button>
        </div>

        <div style={{ marginTop: 20, padding: "12px", background: "var(--ivory)", borderRadius: "var(--radius)", fontSize: 11, color: "var(--muted)", textAlign: "center" }}>
          Admin: admin@camposdesolana.com / admin123
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
