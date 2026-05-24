// ─── ORDER HISTORY PAGE / HISTORIAL DE PEDIDOS ──────────────────────────────

export default function HistoryPage({
  orders = [],
  onUpdateOrderStatus,
  ORDER_STATUS,
}) {
  // Colores y estilos visuales de cada estado.
  const getStatusStyle = (status) => {
    switch (status) {
      case ORDER_STATUS.PENDING:
        return {
          label: "Pendiente",
          backgroundColor: "rgba(196,151,74,0.16)",
          color: "#8A6A28",
          border: "1px solid rgba(196,151,74,0.45)",
        };

      case ORDER_STATUS.CONFIRMED:
        return {
          label: "Confirmado",
          backgroundColor: "rgba(52,152,219,0.12)",
          color: "#1F618D",
          border: "1px solid rgba(52,152,219,0.35)",
        };

      case ORDER_STATUS.PREPARING:
        return {
          label: "En preparación",
          backgroundColor: "rgba(243,156,18,0.15)",
          color: "#AF601A",
          border: "1px solid rgba(243,156,18,0.35)",
        };

      case ORDER_STATUS.SHIPPING:
        return {
          label: "En camino",
          backgroundColor: "rgba(155,89,182,0.14)",
          color: "#6C3483",
          border: "1px solid rgba(155,89,182,0.35)",
        };

      case ORDER_STATUS.DELIVERED:
        return {
          label: "Entregado",
          backgroundColor: "rgba(34,120,70,0.12)",
          color: "#216B47",
          border: "1px solid rgba(34,120,70,0.35)",
        };

      case ORDER_STATUS.CANCELLED:
        return {
          label: "Cancelado",
          backgroundColor: "rgba(192,57,43,0.12)",
          color: "#922B21",
          border: "1px solid rgba(192,57,43,0.35)",
        };

      default:
        return {
          label: status,
          backgroundColor: "var(--ivory)",
          color: "var(--muted)",
          border: "1px solid var(--border)",
        };
    }
  };

  // Flujo visual del pedido.
  const statusSteps = [
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PREPARING,
    ORDER_STATUS.SHIPPING,
    ORDER_STATUS.DELIVERED,
  ];

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  // Formatea fechas para mostrarlas de manera más legible.
  const formatDate = (date) => {
    if (!date) return "No definido";

    return new Date(date).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Renderiza botones dinámicos según el estado actual.
  const renderActions = (order) => {
    switch (order.status) {
      case ORDER_STATUS.PENDING:
        return (
          <>
            <button
              className="btn-primary"
              onClick={() =>
                onUpdateOrderStatus(order.id, ORDER_STATUS.CONFIRMED)
              }
            >
              Confirmar pedido
            </button>

            <button
              className="btn-danger"
              onClick={() =>
                onUpdateOrderStatus(order.id, ORDER_STATUS.CANCELLED)
              }
            >
              Cancelar pedido
            </button>
          </>
        );

      case ORDER_STATUS.CONFIRMED:
        return (
          <>
            <button
              className="btn-primary"
              onClick={() =>
                onUpdateOrderStatus(order.id, ORDER_STATUS.PREPARING)
              }
            >
              Preparar pedido
            </button>

            <button
              className="btn-danger"
              onClick={() =>
                onUpdateOrderStatus(order.id, ORDER_STATUS.CANCELLED)
              }
            >
              Cancelar pedido
            </button>
          </>
        );

      case ORDER_STATUS.PREPARING:
        return (
          <button
            className="btn-primary"
            onClick={() =>
              onUpdateOrderStatus(order.id, ORDER_STATUS.SHIPPING)
            }
          >
            Enviar pedido
          </button>
        );

      case ORDER_STATUS.SHIPPING:
        return (
          <button
            className="btn-primary"
            onClick={() =>
              onUpdateOrderStatus(order.id, ORDER_STATUS.DELIVERED)
            }
          >
            Marcar como entregado
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="page-enter"
      style={{
        padding: "56px 40px",
        maxWidth: 980,
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 42 }}>
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 9,
            letterSpacing: 5,
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 10,
          }}
        >
          Seguimiento de compras
        </div>

        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: 48,
            fontWeight: 300,
            color: "var(--black)",
          }}
        >
          Historial de Pedidos
        </h1>

        <p
          style={{
            color: "var(--muted)",
            marginTop: 10,
            maxWidth: 620,
          }}
        >
          Consulta tus compras realizadas, revisa productos y realiza seguimiento
          del estado actual de cada pedido.
        </p>
      </div>

      {/* Estado vacío */}
      {orders.length === 0 ? (
        <div
          className="card"
          style={{
            padding: "60px 30px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 50,
              opacity: 0.2,
              marginBottom: 16,
            }}
          >
            📦
          </div>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: 32,
              fontWeight: 300,
              marginBottom: 12,
            }}
          >
            No tienes pedidos todavía
          </h2>

          <p style={{ color: "var(--muted)" }}>
            Cuando confirmes una compra aparecerá aquí.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          {orders.map((order) => {
            const statusStyle = getStatusStyle(order.status);
            const statusIndex = getStatusIndex(order.status);
            const isCancelled = order.status === ORDER_STATUS.CANCELLED;
            const delivery = order.delivery || {};

            return (
              <div
                key={order.id}
                className="card"
                style={{
                  padding: "26px 30px",
                  opacity: isCancelled ? 0.7 : 1,
                }}
              >
                {/* Información principal del pedido */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 20,
                    flexWrap: "wrap",
                    marginBottom: 20,
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        letterSpacing: 1.5,
                        color: "var(--muted)",
                        textTransform: "uppercase",
                      }}
                    >
                      Pedido #{order.id}
                    </p>

                    <h2
                      style={{
                        fontFamily: "var(--serif)",
                        fontSize: 28,
                        fontWeight: 400,
                        color: "var(--wine-dark)",
                        marginTop: 4,
                      }}
                    >
                      {order.userName}
                    </h2>

                    <p
                      style={{
                        fontSize: 13,
                        color: "var(--muted)",
                        marginTop: 4,
                      }}
                    >
                      Pedido realizado: {formatDate(order.date)} ·{" "}
                      {order.items.length} producto(s)
                    </p>
                  </div>

                  <span
                    style={{
                      padding: "8px 14px",
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: 1.3,
                      textTransform: "uppercase",
                      ...statusStyle,
                    }}
                  >
                    {statusStyle.label}
                  </span>
                </div>

                {/* Datos de entrega capturados desde el carrito */}
                {order.delivery && (
                  <div
                    style={{
                      borderTop: "1px solid var(--border)",
                      paddingTop: 16,
                      marginBottom: 18,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 12,
                    }}
                  >
                    <InfoItem
                      label="Fecha de entrega"
                      value={formatDate(delivery.deliveryDate)}
                    />

                    <InfoItem
                      label="Departamento"
                      value={delivery.department}
                    />

                    <InfoItem
                      label="Dirección"
                      value={delivery.address}
                    />

                    <InfoItem
                      label="Teléfono"
                      value={delivery.contactPhone || "No definido"}
                    />

                    {delivery.reference && (
                      <InfoItem
                        label="Referencia"
                        value={delivery.reference}
                      />
                    )}
                  </div>
                )}

                {/* Productos del pedido */}
                <div
                  style={{
                    borderTop: "1px solid var(--border)",
                    paddingTop: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 18,
                  }}
                >
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.id}`}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                        fontSize: 13,
                        color: "var(--charcoal)",
                      }}
                    >
                      <span>
                        {item.name}{" "}
                        <span style={{ color: "var(--muted)" }}>
                          x{item.qty}
                        </span>
                      </span>

                      <span>Bs {(item.price * item.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Total del pedido */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border)",
                    paddingTop: 18,
                    marginBottom: 22,
                  }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: "var(--muted)",
                      textTransform: "uppercase",
                      letterSpacing: 1.5,
                    }}
                  >
                    Total pagado
                  </span>

                  <span
                    style={{
                      fontFamily: "var(--serif)",
                      fontSize: 30,
                      color: "var(--wine)",
                    }}
                  >
                    Bs {order.total.toFixed(2)}
                  </span>
                </div>

                {/* Línea visual de avance del pedido */}
                {!isCancelled && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(5, 1fr)",
                      gap: 10,
                      marginBottom: 22,
                    }}
                  >
                    {statusSteps.map((step, index) => {
                      const isActive = index <= statusIndex;

                      return (
                        <div
                          key={step}
                          title={step}
                          style={{
                            height: 8,
                            borderRadius: 20,
                            background: isActive
                              ? "var(--gold)"
                              : "var(--ivory)",
                            border: "1px solid var(--border)",
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {/* Acciones para simular el cambio de estado del pedido */}
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {renderActions(order)}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Componente pequeño para mostrar datos del pedido de forma ordenada.
function InfoItem({ label, value }) {
  return (
    <div>
      <p
        style={{
          fontSize: 10,
          letterSpacing: 1.3,
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: 4,
        }}
      >
        {label}
      </p>

      <p
        style={{
          fontSize: 13,
          color: "var(--charcoal)",
          lineHeight: 1.5,
        }}
      >
        {value || "No definido"}
      </p>
    </div>
  );
}