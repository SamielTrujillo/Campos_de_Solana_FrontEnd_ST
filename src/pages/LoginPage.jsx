// Página de inicio de sesión
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";

function LoginPage({ onLogin, setPage, users, showToast }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const userList = Array.isArray(users) ? users : [];

  const validate = () => {
    const e = {};

    if (!form.email.trim()) {
      e.email = "El correo es obligatorio.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      e.email = "Correo no válido.";
    }

    if (!form.password) {
      e.password = "La contraseña es obligatoria.";
    }

    return e;
  };

  const updateField = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));

    setErrors({});
  };

  const handleSubmit = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const user = userList.find(
      (u) =>
        u.email === form.email.trim() &&
        u.password === form.password
    );

    if (user) {
      onLogin(user);
      showToast(`Bienvenido, ${user.name || "usuario"}`, "success");
    } else {
      setErrors({
        general: "Correo o contraseña incorrectos.",
      });
    }
  };

  return (
    <div
      className="page-enter auth-page"
      style={{
        position: "relative",
      }}
    >
      {/* Botón volver */}
      <button
        type="button"
        className="btn-back"
        onClick={() => setPage("home")}
        style={{
          position: "absolute",
          top: 32,
          left: 40,
        }}
      >
        <span className="btn-back-icon">←</span>
        Volver
      </button>

      <div className="auth-card auth-card-login">
        {/* Encabezado */}
        <div className="auth-heading">
          <div className="auth-eyebrow">Bienvenido</div>

          <h2 className="auth-title">Iniciar Sesión</h2>

          <div className="auth-title-line" />
        </div>

        {errors.general && (
          <div
            style={{
              background: "rgba(107, 31, 42, 0.08)",
              border: "1px solid rgba(107, 31, 42, 0.2)",
              borderRadius: "var(--radius)",
              padding: "12px 14px",
              marginBottom: 22,
              fontSize: 13,
              color: "var(--wine)",
              textAlign: "center",
            }}
          >
            {errors.general}
          </div>
        )}

        {/* Correo electrónico */}
        <div className="field">
          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="tu@correo.com"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />

          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        {/* Contraseña */}
        <PasswordInput
          label="Contraseña"
          value={form.password}
          onChange={(value) => updateField("password", value)}
          error={errors.password}
          onEnter={handleSubmit}
        />

        <button
          type="button"
          className="btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 10,
            padding: "15px 28px",
            fontSize: 13,
            letterSpacing: 2.5,
          }}
          onClick={handleSubmit}
        >
          Entrar
        </button>

        <div
          style={{
            marginTop: 26,
            textAlign: "center",
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          ¿No tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => setPage("register")}
            style={{
              background: "none",
              border: "none",
              color: "var(--wine)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;