// Página de registro
import { useState } from "react";
import PasswordInput from "../components/PasswordInput";

export default function RegisterPage({ onRegister, setPage, users, showToast }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [errors, setErrors] = useState({});

  const userList = Array.isArray(users) ? users : [];

  const validate = () => {
    const e = {};
    const email = form.email.trim().toLowerCase();

    if (!form.name.trim()) {
      e.name = "El nombre es obligatorio.";
    }

    if (!email) {
      e.email = "El correo es obligatorio.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      e.email = "Correo no válido.";
    } else if (userList.find((u) => u.email?.toLowerCase() === email)) {
      e.email = "Este correo ya está registrado.";
    }

    if (!form.phone.trim()) {
      e.phone = "El teléfono es obligatorio.";
    } else if (!/^[67]\d{7}$/.test(form.phone)) {
      e.phone = "Ingresa un celular boliviano válido de 8 dígitos.";
    }

    if (!form.password) {
      e.password = "La contraseña es obligatoria.";
    } else if (form.password.length < 6) {
      e.password = "Mínimo 6 caracteres.";
    }

    if (!form.confirm) {
      e.confirm = "Debes confirmar la contraseña.";
    } else if (form.password !== form.confirm) {
      e.confirm = "Las contraseñas no coinciden.";
    }

    return e;
  };

  const handleSubmit = () => {
    const e = validate();

    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      phone: `+591 ${form.phone}`,
      password: form.password,
      role: "client",
      createdAt: new Date().toISOString(),
    };

    onRegister(newUser);
    showToast("Cuenta creada con éxito. Bienvenido.", "success");
  };

  const updateField = (key, value) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: value,
    }));

    setErrors({});
  };

  const normalField = (key, label, type = "text", placeholder = "") => (
    <div className="field">
      <label>{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => updateField(key, e.target.value)}
      />

      {errors[key] && <span className="error">{errors[key]}</span>}
    </div>
  );

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

      <div className="auth-card auth-card-register">
        {/* Encabezado */}
        <div className="auth-heading">
          <div className="auth-eyebrow">Únete a nosotros</div>

          <h2 className="auth-title">Crear Cuenta</h2>

          <div className="auth-title-line" />

          <p
            style={{
              margin: "18px auto 0",
              maxWidth: 330,
              fontSize: 14,
              lineHeight: 1.7,
              color: "var(--muted)",
            }}
          >
            Regístrate para comprar vinos, guardar tus pedidos y revisar el
            estado de tus compras.
          </p>
        </div>

        {/* Nombre */}
        {normalField("name", "Nombre completo", "text", "Ana García")}

        {/* Correo */}
        {normalField("email", "Correo electrónico", "email", "tu@correo.com")}

        {/* Teléfono */}
        <div className="field">
          <label>Teléfono</label>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              background: "var(--white)",
              overflow: "hidden",
              transition: "var(--transition)",
            }}
          >
            <span
              style={{
                alignSelf: "stretch",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 16px",
                minWidth: 64,
                borderRight: "1px solid var(--border)",
                background: "var(--ivory)",
                color: "var(--wine)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
                whiteSpace: "nowrap",
              }}
            >
              +591
            </span>

            <input
              type="tel"
              inputMode="numeric"
              maxLength={8}
              placeholder="70000000"
              value={form.phone}
              onChange={(e) => {
                const onlyNumbers = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 8);

                updateField("phone", onlyNumbers);
              }}
              style={{
                border: "none",
                boxShadow: "none",
                borderRadius: 0,
                background: "transparent",
              }}
            />
          </div>

          {errors.phone && <span className="error">{errors.phone}</span>}

          {!errors.phone && (
            <span
              style={{
                fontSize: 11,
                color: "var(--muted)",
                marginTop: 2,
              }}
            >
              Usaremos este número para el seguimiento del pedido.
            </span>
          )}
        </div>

        {/* Contraseña */}
        <PasswordInput
          label="Contraseña"
          value={form.password}
          onChange={(value) => updateField("password", value)}
          error={errors.password}
        />

        {/* Confirmar contraseña */}
        <PasswordInput
          label="Confirmar contraseña"
          value={form.confirm}
          onChange={(value) => updateField("confirm", value)}
          error={errors.confirm}
          onEnter={handleSubmit}
        />

        <button
          type="button"
          className="btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            marginTop: 12,
            padding: "15px 28px",
            fontSize: 13,
            letterSpacing: 2.5,
          }}
          onClick={handleSubmit}
        >
          Crear cuenta
        </button>

        <div
          style={{
            marginTop: 26,
            textAlign: "center",
            fontSize: 14,
            color: "var(--muted)",
          }}
        >
          ¿Ya tienes cuenta?{" "}
          <button
            type="button"
            onClick={() => setPage("login")}
            style={{
              background: "none",
              border: "none",
              color: "var(--wine)",
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </div>
  );
}