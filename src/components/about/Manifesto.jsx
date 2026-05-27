export default function Manifesto({ title, text }) {
  return (
    <section className="manifesto">
      <div className="about-container">
        <h3>{title}</h3>
        <p style={{ marginTop: 18 }}>{text}</p>
      </div>
    </section>
  );
}
