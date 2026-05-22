export default function CartPage({
  cart,
  onRemove,
  onUpdateQty,
  onCheckout,
}) {
  // HU9 / HU19 - Simulación de compra:
  // Calcula el total del carrito antes de confirmar el pedido.
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

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
        maxWidth: 900,
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
            minWidth: 300,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {cart.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                padding: "18px 20px",
                display: "flex",
                gap: 16,
                alignItems: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  height: 70,
                  objectFit: "contain",
                  filter: "drop-shadow(0 2px 8px rgba(107,31,42,0.2))",
                }}
              />

              <div style={{ flex: 1 }}>
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
                  {item.year} · {item.region}
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

              {/* Control de cantidad */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button
                  onClick={() => onUpdateQty(item.id, item.qty - 1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    background: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    color: "var(--muted)",
                  }}
                >
                  −
                </button>

                <span
                  style={{
                    fontWeight: 600,
                    minWidth: 20,
                    textAlign: "center",
                  }}
                >
                  {item.qty}
                </span>

                <button
                  onClick={() => onUpdateQty(item.id, item.qty + 1)}
                  style={{
                    width: 28,
                    height: 28,
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    background: "none",
                    cursor: "pointer",
                    fontSize: 16,
                    color: "var(--muted)",
                  }}
                >
                  +
                </button>
              </div>

              <div style={{ textAlign: "right", minWidth: 80 }}>
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
                  style={{ marginTop: 6, padding: "5px 10px", fontSize: 10 }}
                  onClick={() => onRemove(item.id)}
                >
                  Quitar
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div style={{ flex: 1, minWidth: 240 }}>
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

            {/* HU9 / HU19:
                Al confirmar el pedido, App.jsx guarda la compra simulada
                en localStorage y luego la muestra en el historial. */}
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onCheckout}
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
              Compra simulada para validar el flujo de carrito, pedido e historial.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}