export default function AwardsSection({ image, awards = [] }) {
  return (
    <section style={{ padding: "80px 24px", background: "transparent" }}>
      <div className="about-container">
        <div className="section-heading">
          <p className="section-eyebrow">Premios</p>
          <h3 className="section-title">Reconocimientos y nuestra colección</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 36, alignItems: "start" }}>
          <div>
            <div className="awards-grid">
              {awards.map((a, i) => (
                <div className="award-card" key={i}>
                  <h4>{a.title}</h4>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-image">
            <img src={image} alt="Vinos" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}
