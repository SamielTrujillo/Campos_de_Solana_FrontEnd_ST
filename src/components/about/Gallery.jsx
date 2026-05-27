import Reveal from "./Reveal";
export default function Gallery({ images = [] }) {
  return (
    <section style={{ padding: "40px 24px 120px" }}>
      <div className="about-container">
        <div className="section-heading">
          <p className="section-eyebrow">Galería</p>
          <h3 className="section-title">Imágenes del viñedo y la bodega</h3>
        </div>

        <div className="gallery-grid">
          {images.map((src, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="gallery-item" key={i}>
                <img src={src} alt={`Galería ${i + 1}`} loading="lazy" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
