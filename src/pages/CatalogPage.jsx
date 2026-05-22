// ─── CATALOG PAGE ────────────────────────────────────────────────────────────
import { useState } from "react";

import WineCard from "../components/WineCard";

export default function CatalogPage({
  wines,
  onAddToCart,
  onBuy,
  showToast,
  currentUser,
  setPage,
}) {
  // Language state
  const [language, setLanguage] = useState("es");

  // Category filter state
  const [filter, setFilter] = useState("Todos");

  // Search input state
  const [search, setSearch] = useState("");

  // Category options
  const categories = [
    "Todos",
    "Destacados",
    ...Array.from(new Set(wines.map((wine) => wine.category))),
  ];

  // HU18 + HU22: filter wines by category, featured status, name, or region
  const filteredWines = wines.filter((wine) => {
    const matchesCategory =
      filter === "Todos" ||
      wine.category === filter ||
      (filter === "Destacados" && wine.featured);

    const matchesSearch =
      wine.name.toLowerCase().includes(search.toLowerCase()) ||
      wine.region.toLowerCase().includes(search.toLowerCase()) ||
      wine.category.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="page-enter"
      style={{
        padding: "32px 40px 70px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      {/* Top actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 55,
        }}
      >
        {/* Back button */}
        <button
          className="btn-outline"
          onClick={() => setPage("home")}
        >
          ← {language === "es" ? "Volver" : "Back"}
        </button>

        {/* Language button */}
        <button
          className="btn-outline"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </div>

      {/* Header */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 48,
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 9,
            letterSpacing: 5,
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          {language === "es" ? "Nuestra selección" : "Our Selection"}
        </div>

        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: 52,
            fontWeight: 300,
            color: "var(--black)",
          }}
        >
          {language === "es" ? "Catálogo de Vinos" : "Wine Catalog"}
        </h1>

        <div
          style={{
            width: 60,
            height: 1,
            background: "var(--gold)",
            margin: "18px auto 0",
          }}
        />
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: 28,
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              padding: "9px 22px",
              border: "1px solid",
              borderRadius: "var(--radius)",
              fontFamily: "var(--sans)",
              fontSize: 11,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "var(--trans)",
              background: filter === category ? "var(--wine)" : "transparent",
              borderColor:
                filter === category ? "var(--wine)" : "var(--border)",
              color:
                filter === category ? "var(--gold-pale)" : "var(--muted)",
            }}
          >
            {language === "es"
              ? category
              : category === "Todos"
              ? "All"
              : category === "Destacados"
              ? "Featured"
              : category}
          </button>
        ))}
      </div>

      {/* Search */}
      <div
        style={{
          maxWidth: 430,
          margin: "0 auto 55px",
          position: "relative",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--muted)",
            fontSize: 14,
          }}
        >
          🔍
        </span>

        <input
          placeholder={
            language === "es"
              ? "Buscar por nombre, categoría o región..."
              : "Search by name, category or region..."
          }
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "13px 16px 13px 42px",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            fontFamily: "var(--sans)",
            fontSize: 14,
            outline: "none",
            transition: "var(--trans)",
            background: "#fff",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "var(--gold)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--border)";
          }}
        />
      </div>

      {/* Wine grid */}
      {filteredWines.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "70px 0",
            color: "var(--muted)",
            fontFamily: "var(--serif)",
            fontSize: 24,
            fontStyle: "italic",
          }}
        >
          {language === "es"
            ? "No se encontraron vinos con ese criterio."
            : "No wines were found with that criteria."}
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 28,
          }}
        >
          {filteredWines.map((wine) => (
            <WineCard
              key={wine.id}
              wine={wine}
              onAddToCart={onAddToCart}
              onBuy={onBuy}
              showToast={showToast}
              currentUser={currentUser}
              setPage={setPage}
            />
          ))}
        </div>
      )}
    </div>
  );
}