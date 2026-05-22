// ─── NAVBAR ──────────────────────────────────────────────────────────────────
import { useState } from "react";
function Navbar({ page, setPage, currentUser, onLogout, cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 500,
      background: "rgba(248,244,238,0.95)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border)", padding: "0 40px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 72,
    }}>
      {/* Logo */}
      <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 22, fontWeight: 300, letterSpacing: 3, color: "var(--wine)", lineHeight: 1 }}>CAMPOS</span>
        <span style={{ fontFamily: "var(--sans)", fontSize: 10, fontWeight: 500, letterSpacing: 5, color: "var(--gold)", marginTop: 1 }}>DE SOLANA</span>
      </button>

      {/* Center links */}
      {currentUser && currentUser.role !== "admin" && (
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["home", "catalog"].map(p => (
            <button key={p} onClick={() => setPage(p)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--sans)", fontSize: 11, fontWeight: 500,
              letterSpacing: 2, textTransform: "uppercase",
              color: page === p ? "var(--wine)" : "var(--muted)",
              transition: "var(--trans)", paddingBottom: 2,
              borderBottom: page === p ? "1px solid var(--wine)" : "1px solid transparent",
            }}>
              {p === "home" ? "Inicio" : "Catálogo"}
            </button>
          ))}
        </div>
      )}

      {/* Right actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {!currentUser ? (
          <>
            <button className="btn-outline" onClick={() => setPage("login")}>Iniciar sesión</button>
            <button className="btn-primary" onClick={() => setPage("register")}>Registrarse</button>
          </>
        ) : currentUser.role === "admin" ? (
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              Panel Admin · <strong style={{ color: "var(--wine)" }}>{currentUser.name}</strong>
            </span>
            <button className="btn-outline" onClick={onLogout}>Salir</button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setPage("cart")} style={{
              background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-md)",
              padding: "8px 14px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
              fontFamily: "var(--sans)", fontSize: 12, transition: "var(--trans)",
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              🛒 <span style={{ fontWeight: 600, color: "var(--wine)" }}>{cartCount}</span>
            </button>
            <button onClick={() => setPage("history")} className="btn-outline">Mis compras</button>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>
              {currentUser.name.split(" ")[0]}
            </div>
            <button className="btn-outline" onClick={onLogout}>Salir</button>
          </div>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
