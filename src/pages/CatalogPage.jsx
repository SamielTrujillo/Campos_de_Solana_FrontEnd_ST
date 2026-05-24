// Página de catálogo
import { useState } from "react";
import WineCard from "../components/WineCard";

export default function CatalogPage({
  wines,
  onAddToCart,
  onBuy,
  currentUser,
  setPage,
}) {
  const [language, setLanguage] = useState("es");
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");

  const wineList = Array.isArray(wines) ? wines : [];

  const categories = [
    "Todos",
    "Destacados",
    ...Array.from(new Set(wineList.map((wine) => wine.category))),
  ];

  const getCategoryLabel = (category) => {
    if (language === "es") return category;

    if (category === "Todos") return "All";
    if (category === "Destacados") return "Featured";
    if (category === "Tinto") return "Red";
    if (category === "Blanco") return "White";
    if (category === "Dulce") return "Sweet";
    if (category === "Rosé") return "Rosé";

    return category;
  };

  const filteredWines = wineList.filter((wine) => {
    const text = search.trim().toLowerCase();

    const name = wine.name?.toLowerCase() || "";
    const region = wine.region?.toLowerCase() || "";
    const category = wine.category?.toLowerCase() || "";
    const tags = Array.isArray(wine.tags) ? wine.tags : [];

    const matchesCategory =
      filter === "Todos" ||
      wine.category === filter ||
      (filter === "Destacados" && wine.featured);

    const matchesSearch =
      text === "" ||
      name.includes(text) ||
      region.includes(text) ||
      category.includes(text) ||
      tags.some((tag) => tag.toLowerCase().includes(text));

    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch((currentSearch) => currentSearch.trim());
  };

  const clearSearch = () => {
    setSearch("");
  };

  const resultText =
    language === "es"
      ? `${filteredWines.length} vino(s) encontrado(s)`
      : `${filteredWines.length} wine(s) found`;

  return (
    <div
      className="page-enter catalog-page"
      style={{
        padding: "32px 40px 70px",
        maxWidth: 1280,
        margin: "0 auto",
      }}
    >
      {/* Acciones superiores */}
      <div className="page-actions">
        <button
          type="button"
          className="btn-back"
          onClick={() => setPage("home")}
        >
          <span className="btn-back-icon">←</span>
          {language === "es" ? "Volver" : "Back"}
        </button>

        <button
          type="button"
          className="btn-lang"
          onClick={() => setLanguage(language === "es" ? "en" : "es")}
        >
          {language === "es" ? "EN" : "ES"}
        </button>
      </div>

      {/* Encabezado */}
      <section className="catalog-header">
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 6,
            color: "var(--gold)",
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          {language === "es" ? "Nuestra selección" : "Our Selection"}
        </div>

        <h1
          style={{
            fontFamily: "var(--serif)",
            fontSize: "clamp(48px, 6vw, 78px)",
            lineHeight: 0.95,
            letterSpacing: -1,
            fontWeight: 400,
            color: "var(--black)",
          }}
        >
          {language === "es" ? "Catálogo de Vinos" : "Wine Catalog"}
        </h1>

        <div
          style={{
            width: 68,
            height: 1,
            background: "var(--gold)",
            margin: "22px auto 0",
          }}
        />
      </section>

      {/* Filtros */}
      <section className="catalog-filters">
        {categories.map((category) => {
          const active = filter === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              style={{
                padding: "13px 30px",
                border: "1px solid",
                borderRadius: "var(--radius-md)",
                fontFamily: "var(--sans)",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: 2.2,
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "var(--transition)",
                background: active ? "var(--wine)" : "#fff",
                borderColor: active ? "var(--wine)" : "var(--border)",
                color: active ? "var(--gold-light)" : "var(--muted)",
                boxShadow: active
                  ? "0 10px 26px rgba(107, 31, 42, 0.18)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "var(--wine)";
                  e.currentTarget.style.color = "var(--wine)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              {getCategoryLabel(category)}
            </button>
          );
        })}
      </section>

      {/* Buscador */}
      <form className="catalog-search-wrap" onSubmit={handleSearchSubmit}>
        <div className="catalog-search">
          <input
            type="text"
            className="catalog-search-input"
            placeholder={
              language === "es"
                ? "Buscar por nombre, categoría, región o etiqueta..."
                : "Search by name, category, region or tag..."
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search.trim() !== "" && (
            <button
              type="button"
              className="catalog-search-clear"
              onClick={clearSearch}
              title={language === "es" ? "Limpiar búsqueda" : "Clear search"}
              aria-label={
                language === "es" ? "Limpiar búsqueda" : "Clear search"
              }
            >
              ×
            </button>
          )}

          <button
            type="submit"
            className="catalog-search-button"
            title={language === "es" ? "Buscar" : "Search"}
            aria-label={language === "es" ? "Buscar" : "Search"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M16 16L21 21"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </form>

      {/* Contador de resultados */}
      <div className="catalog-results">{resultText}</div>

      {/* Lista de vinos */}
      {filteredWines.length === 0 ? (
        <section
          className="card"
          style={{
            textAlign: "center",
            padding: "60px 24px",
            color: "var(--muted)",
          }}
        >
          <div
            style={{
              fontSize: 42,
              opacity: 0.3,
              marginBottom: 12,
            }}
          >
            🍷
          </div>

          <h2
            style={{
              fontFamily: "var(--serif)",
              fontSize: 32,
              fontWeight: 400,
              color: "var(--wine)",
              marginBottom: 8,
            }}
          >
            {language === "es" ? "No encontramos vinos" : "No wines found"}
          </h2>

          <p>
            {language === "es"
              ? "Intenta cambiar el filtro o buscar con otro criterio."
              : "Try changing the filter or searching with another keyword."}
          </p>
        </section>
      ) : (
        <section
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
              currentUser={currentUser}
              setPage={setPage}
            />
          ))}
        </section>
      )}
    </div>
  );
}