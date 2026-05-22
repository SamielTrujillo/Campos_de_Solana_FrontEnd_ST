import { useState } from "react";

export default function WineCard({
  wine,
  onAddToCart,
  onBuy,
}) {
  // Estado visual para animar la tarjeta cuando el usuario pasa el mouse.
  const [hover, setHover] = useState(false);

  // HU6 - Disponibilidad de vinos:
  // Si el stock es 0, el vino se marca como agotado y se bloquean las acciones.
  const isOutOfStock = wine.stock === 0;

  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        opacity: isOutOfStock ? 0.7 : 1,
        transform: hover ? "translateY(-6px)" : "none",
        transition: "var(--transition)",
        boxShadow: hover
          ? "0 20px 40px rgba(0,0,0,0.18)"
          : "0 6px 16px rgba(0,0,0,0.06)",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Imagen del vino */}
      <div
        style={{
          background:
            "linear-gradient(135deg, var(--wine-dark) 0%, var(--wine) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 24px",
          position: "relative",
          minHeight: 340,
        }}
      >
        {/* Año del vino */}
        <div style={{ position: "absolute", top: 14, right: 14 }}>
          <span
            className="badge"
            style={{
              background: "rgba(196,151,74,0.25)",
              color: "var(--gold-soft)",
              fontSize: 10,
              letterSpacing: 1.5,
            }}
          >
            {wine.year}
          </span>
        </div>

        {/* HU22 - Vinos destacados */}
        {wine.featured && (
          <div style={{ position: "absolute", top: 14, left: 14 }}>
            <span className="badge badge-gold">Destacado</span>
          </div>
        )}

        <div
          style={{
            width: "100%",
            height: 260,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 12,
              width: 90,
              height: 16,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.28)",
              filter: "blur(10px)",
            }}
          />

          <img
            src={wine.image}
            alt={wine.name}
            style={{
              maxHeight: 230,
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 18px 28px rgba(0,0,0,0.38))",
              transition: "var(--transition)",
              transform: hover ? "scale(1.08)" : "scale(1)",
              position: "relative",
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* Contenido */}
      <div
        style={{
          padding: "24px 24px 20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          <span className="badge badge-wine">{wine.category}</span>
          <span className="badge badge-gold">{wine.region}</span>
        </div>

        <h3
          style={{
            fontFamily: "var(--serif)",
            fontSize: 24,
            fontWeight: 400,
            lineHeight: 1.2,
            marginBottom: 8,
            minHeight: 60,
          }}
        >
          {wine.name}
        </h3>

        <p
          style={{
            fontSize: 13,
            color: "var(--muted)",
            lineHeight: 1.7,
            flex: 1,
            marginBottom: 16,
            minHeight: 110,
          }}
        >
          {wine.description}
        </p>

        <div
          style={{
            display: "flex",
            gap: 6,
            flexWrap: "wrap",
            marginBottom: 20,
            minHeight: 36,
          }}
        >
          {wine.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                background: "var(--ivory)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                padding: "3px 8px",
                color: "var(--muted)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Precio y stock */}
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: 18,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: "var(--serif)",
                fontSize: 30,
                color: "var(--wine)",
              }}
            >
              ${wine.price}
            </span>

            <span
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: isOutOfStock ? "#b42318" : "var(--muted)",
              }}
            >
              {isOutOfStock ? "Agotado" : `${wine.stock} disponibles`}
            </span>
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: 10 }}>
            <button
              className="btn-outline"
              style={{
                flex: 1,
                justifyContent: "center",
                opacity: isOutOfStock ? 0.5 : 1,
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
              disabled={isOutOfStock}
              onClick={() => onAddToCart(wine)}
            >
              {isOutOfStock ? "Agotado" : "Carrito"}
            </button>

            <button
              className="btn-primary"
              style={{
                flex: 1,
                justifyContent: "center",
                opacity: isOutOfStock ? 0.5 : 1,
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
              disabled={isOutOfStock}
              onClick={() => onBuy(wine)}
            >
              {isOutOfStock ? "No disponible" : "Comprar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}