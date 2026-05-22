
// ─── HOME / HERO ─────────────────────────────────────────────────────────────
function HomePage({ setPage, wines }) {
  const featured = wines.slice(0, 3);
  return (
    <div className="page-enter">
      {/* Hero Banner */}
      <div style={{
        height: "88vh", minHeight: 520,
        background: `linear-gradient(120deg, var(--wine-dark) 0%, var(--wine) 60%, #8B3040 100%)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(196,151,74,0.18)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
        <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(196,151,74,0.09)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />

        {/* Gold lines */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "var(--gold)", opacity: 0.5 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "var(--gold)", opacity: 0.5 }} />

        <div style={{ textAlign: "center", color: "#fff", padding: "0 24px", maxWidth: 680, position: "relative" }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: 6, color: "var(--gold-soft)", marginBottom: 20, textTransform: "uppercase" }}>
            Bodega · Desde 1892
          </div>
          <h1 style={{
            fontFamily: "var(--serif)", fontWeight: 300, fontSize: "clamp(52px, 8vw, 88px)",
            lineHeight: 0.95, letterSpacing: 2, color: "#fff", marginBottom: 24,
          }}>
            Campos<br /><em style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>de Solana</em>
          </h1>
          <p style={{ fontFamily: "var(--sans)", fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,0.72)", maxWidth: 460, margin: "0 auto 36px" }}>
            Vinos de carácter nacidos en la tierra. Cada botella es el reflejo de nuestra tradición y pasión por la viticultura de excelencia.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" onClick={() => setPage("catalog")}>Explorar Catálogo</button>
            <button onClick={() => setPage("register")} style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.3)",
              color: "#fff", padding: "11px 28px", fontFamily: "var(--sans)",
              fontSize: 12, letterSpacing: 1.8, textTransform: "uppercase",
              cursor: "pointer", transition: "var(--trans)", borderRadius: "var(--radius)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
            >
              Crear cuenta
            </button>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: 4, background: `linear-gradient(90deg, transparent, var(--gold), transparent)` }} />

      {/* Stats strip */}
      <div style={{ background: "var(--black)", padding: "28px 40px", display: "flex", justifyContent: "center", gap: 64, flexWrap: "wrap" }}>
        {[["130+", "Años de historia"], ["6", "Variedades de uva"], ["18", "Premios internacionales"], ["42", "Países destino"]].map(([n, l]) => (
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "var(--serif)", fontSize: 36, fontWeight: 300, color: "var(--gold)" }}>{n}</div>
            <div style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Featured wines section */}
      <div style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontFamily: "var(--sans)", fontSize: 10, letterSpacing: 5, color: "var(--gold)", textTransform: "uppercase", marginBottom: 12 }}>Selección destacada</div>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: 44, fontWeight: 300, color: "var(--black)" }}>
            Nuestros Vinos
          </h2>
          <div style={{ width: 60, height: 1, background: "var(--gold)", margin: "20px auto 0" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 28 }}>
          {featured.map(wine => (
            <MiniWineCard key={wine.id} wine={wine} setPage={setPage} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 52 }}>
          <button className="btn-primary" onClick={() => setPage("catalog")}>
            Ver catálogo completo →
          </button>
        </div>
      </div>

      {/* Quote strip */}
      <div style={{ background: "var(--ivory)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "60px 40px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: 26, fontWeight: 300, fontStyle: "italic", color: "var(--wine-dark)", maxWidth: 600, margin: "0 auto", lineHeight: 1.6 }}>
          "El vino es poesía en botella, la expresión más pura del terroir y del tiempo."
        </p>
        <div style={{ marginTop: 20, fontFamily: "var(--sans)", fontSize: 10, letterSpacing: 3, color: "var(--muted)", textTransform: "uppercase" }}>
          — Fundadores de Campos de Solana
        </div>
      </div>
    </div>
  );
}

function MiniWineCard({ wine, setPage }) {
  return (
    <div className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 140 }}>
        <img src={wine.image} alt={wine.name} style={{ height: 130, objectFit: "contain", filter: "drop-shadow(0 6px 18px rgba(107,31,42,0.18))" }}
          onError={e => { e.currentTarget.src = `https://via.placeholder.com/90x130/6B1F2A/FFFFFF?text=${encodeURIComponent(wine.year)}`; }} />
      </div>
      <div>
        <span className="badge badge-wine">{wine.category}</span>
        <h3 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 400, marginTop: 10, lineHeight: 1.3 }}>{wine.name}</h3>
        <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{wine.region} · {wine.year}</p>
      </div>
      <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.7, flex: 1 }}>{wine.description.substring(0, 100)}…</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--border)" }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: 24, color: "var(--wine)", fontWeight: 400 }}>{wine.price.toFixed(2)}€</span>
        <button className="btn-primary" style={{ padding: "9px 18px", fontSize: 10 }} onClick={() => setPage("catalog")}>Ver más</button>
      </div>
    </div>
  );
}
export default HomePage;