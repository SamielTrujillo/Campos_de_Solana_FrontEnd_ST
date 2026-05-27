import Reveal from "./Reveal";
export default function Timeline({ items = [] }) {
  return (
    <section style={{ padding: "80px 24px" }}>
      <div className="about-container">
        <div className="section-heading">
          <p className="section-eyebrow">Cronología</p>
          <h3 className="section-title">Hitos que marcaron nuestro camino</h3>
        </div>

        <div className="timeline">
          {items.map((it, idx) => (
            <Reveal delay={idx * 0.12}>
              <div className="timeline-item" key={idx}>
                <div className="timeline-item__year">{it.year}</div>
                <h4 className="timeline-item__title">{it.title}</h4>
                <p className="timeline-item__desc">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
