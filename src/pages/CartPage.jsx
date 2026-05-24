import { useState } from "react";

export default function CartPage({
  cart,
  onRemove,
  onUpdateQty,
  onCheckout,
  showToast,
}) {
  // HU9 / HU19 - Simulación de compra:
  // Calcula el total del carrito antes de confirmar el pedido.
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Lista de departamentos disponibles para la entrega dentro de Bolivia.
  const departamentosBolivia = [
    "La Paz",
    "Cochabamba",
    "Santa Cruz",
    "Oruro",
    "Potosí",
    "Chuquisaca",
    "Tarija",
    "Beni",
    "Pando",
  ];

  // Obtiene la fecha mínima permitida para la entrega.
  // Se usa mañana como fecha mínima para evitar pedidos con fecha pasada
  // o pedidos para el mismo día.
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  // Información temporal del pedido antes de confirmarlo.
  // Estos datos se enviarán a App.jsx cuando el usuario confirme el pedido.
  const [deliveryData, setDeliveryData] = useState({
    department: "",
    address: "",
    deliveryDate: "",
    contactPhone: "",
    reference: "",
  });

  const minDeliveryDate = getTomorrowDate();

  // Actualiza los campos del formulario de entrega.
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDeliveryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Valida los datos obligatorios antes de confirmar el pedido.
  const handleCheckout = () => {
    if (!deliveryData.department) {
      showToast?.("Selecciona el departamento de entrega", "error");
      return;
    }

    if (!deliveryData.address.trim()) {
      showToast?.("Ingresa la dirección de entrega", "error");
      return;
    }

    if (!deliveryData.deliveryDate) {
      showToast?.("Selecciona la fecha de entrega", "error");
      return;
    }

    if (deliveryData.deliveryDate < minDeliveryDate) {
      showToast?.(
        "La fecha de entrega debe ser posterior a la fecha del pedido",
        "error"
      );
      return;
    }

    onCheckout(deliveryData);
  };

  // Si no hay productos en el carrito, se muestra un estado vacío.
  if (cart.length === 0) {
    return (
      <div
        className="page-enter"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            fontFamily: "var(--serif)",
            fontSize: 52,
            opacity: 0.15,
          }}
        >
          🛒
        </div>

        <p
          style={{
            fontFamily: "var(--serif)",
            fontSize: 24,
            fontWeight: 300,
            color: "var(--muted)",
            fontStyle: "italic",
          }}
        >
          Tu carrito está vacío
        </p>
      </div>
    );
  }

  return (
    <div
      className="page-enter"
      style={{
        padding: "56px 40px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div style={{ marginBottom: 40 }}>
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 9,
            letterSpacing: 5,
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Mi selección
        </div>

        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: 42,
            fontWeight: 300,
          }}
        >
          Carrito de Compras
        </h1>
      </div>

      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {/* Lista de productos agregados al carrito */}
        <div
          style={{
            flex: 2,
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {cart.map((item) => {
            const stockDisponible = item.stock ?? 0;
            const sinMasStock = item.qty >= stockDisponible;

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: "18px 20px",
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    height: 82,
                    objectFit: "contain",
                    filter: "drop-shadow(0 2px 8px rgba(107,31,42,0.2))",
                  }}
                />

                <div style={{ flex: 1, minWidth: 180 }}>
                  <h4
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 17,
                      fontWeight: 400,
                    }}
                  >
                    {item.name}
                  </h4>

                  <p style={{ fontSize: 12, color: "var(--muted)" }}>
                    {item.year} · {item.region} · 750 ml
                  </p>

                  <p
                    style={{
                      fontSize: 11,
                      color: stockDisponible > 0 ? "var(--muted)" : "#922B21",
                      marginTop: 4,
                    }}
                  >
                    Stock disponible: {stockDisponible} unidad(es)
                  </p>

                  <p
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 18,
                      color: "var(--wine)",
                      marginTop: 4,
                    }}
                  >
                    Bs {item.price.toFixed(2)} / unidad
                  </p>
                </div>

                {/* Control de cantidad del producto.
                    No permite bajar de 1 ni superar el stock disponible. */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    style={{
                      width: 30,
                      height: 30,
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      background: item.qty <= 1 ? "var(--ivory)" : "none",
                      cursor: item.qty <= 1 ? "not-allowed" : "pointer",
                      fontSize: 16,
                      color: "var(--muted)",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      fontWeight: 600,
                      minWidth: 22,
                      textAlign: "center",
                    }}
                  >
                    {item.qty}
                  </span>

                  <button
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    disabled={sinMasStock}
                    style={{
                      width: 30,
                      height: 30,
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius)",
                      background: sinMasStock ? "var(--ivory)" : "none",
                      cursor: sinMasStock ? "not-allowed" : "pointer",
                      fontSize: 16,
                      color: "var(--muted)",
                    }}
                  >
                    +
                  </button>
                </div>

                <div style={{ textAlign: "right", minWidth: 90 }}>
                  <p
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 20,
                      fontWeight: 400,
                      color: "var(--wine)",
                    }}
                  >
                    Bs {(item.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    className="btn-danger"
                    style={{
                      marginTop: 6,
                      padding: "5px 10px",
                      fontSize: 10,
                    }}
                    onClick={() => onRemove(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen del pedido */}
        <div style={{ flex: 1, minWidth: 290 }}>
          <div
            className="card"
            style={{
              padding: "28px 24px",
              position: "sticky",
              top: 90,
            }}
          >
            <h3
              style={{
                fontFamily: "var(--serif)",
                fontSize: 24,
                fontWeight: 400,
                marginBottom: 20,
              }}
            >
              Resumen
            </h3>

            <div className="divider" style={{ margin: "0 0 20px" }} />

            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  fontSize: 13,
                  color: "var(--muted)",
                  gap: 10,
                }}
              >
                <span>
                  {item.name.length > 20
                    ? item.name.substring(0, 20) + "…"
                    : item.name}{" "}
                  ×{item.qty}
                </span>

                <span>Bs {(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}

            <div className="divider" />

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <span style={{ fontWeight: 600, fontSize: 14 }}>Total</span>

              <span
                style={{
                  fontFamily: "var(--serif)",
                  fontSize: 28,
                  color: "var(--wine)",
                }}
              >
                Bs {total.toFixed(2)}
              </span>
            </div>

            <div className="divider" />

            {/* Datos de entrega del pedido */}
            <h4
              style={{
                fontFamily: "var(--serif)",
                fontSize: 20,
                fontWeight: 400,
                marginBottom: 16,
              }}
            >
              Datos de entrega
            </h4>

            <label style={labelStyle}>Departamento</label>
            <select
              name="department"
              value={deliveryData.department}
              onChange={handleChange}
              style={inputStyle}
            >
              <option value="">Seleccionar departamento</option>
              {departamentosBolivia.map((dep) => (
                <option key={dep} value={dep}>
                  {dep}
                </option>
              ))}
            </select>

            <label style={labelStyle}>Dirección de entrega</label>
            <input
              type="text"
              name="address"
              value={deliveryData.address}
              onChange={handleChange}
              placeholder="Ej: Av. Ballivián #123"
              style={inputStyle}
            />

            <label style={labelStyle}>Fecha de entrega</label>
            <input
              type="date"
              name="deliveryDate"
              value={deliveryData.deliveryDate}
              onChange={handleChange}
              min={minDeliveryDate}
              style={inputStyle}
            />

            <label style={labelStyle}>Teléfono de contacto</label>
            <input
              type="text"
              name="contactPhone"
              value={deliveryData.contactPhone}
              onChange={handleChange}
              placeholder="Opcional"
              style={inputStyle}
            />

            <label style={labelStyle}>Referencia</label>
            <textarea
              name="reference"
              value={deliveryData.reference}
              onChange={handleChange}
              placeholder="Opcional: edificio, zona, entre calles..."
              rows="3"
              style={{
                ...inputStyle,
                resize: "none",
                fontFamily: "var(--sans)",
              }}
            />

            {/* HU9 / HU19:
                Al confirmar el pedido, App.jsx guarda la compra simulada
                en localStorage y luego la muestra en el historial. */}
            <button
              className="btn-primary"
              style={{
                width: "100%",
                justifyContent: "center",
                marginTop: 10,
              }}
              onClick={handleCheckout}
            >
              Confirmar pedido
            </button>

            <p
              style={{
                fontSize: 11,
                color: "var(--muted)",
                textAlign: "center",
                marginTop: 14,
                lineHeight: 1.6,
              }}
            >
              La fecha de entrega debe ser posterior a la fecha del pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Estilo reutilizable para las etiquetas del formulario.
const labelStyle = {
  display: "block",
  fontSize: 11,
  color: "var(--muted)",
  textTransform: "uppercase",
  letterSpacing: 1.2,
  marginBottom: 6,
  marginTop: 12,
};

// Estilo reutilizable para inputs, select y textarea.
const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius)",
  background: "var(--ivory)",
  color: "var(--charcoal)",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};