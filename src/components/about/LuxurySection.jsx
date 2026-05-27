import { motion } from "framer-motion";

export default function LuxurySection({
  image,
  title,
  text,
}) {
  return (
    <section className="luxury-section">
      <div
        className="luxury-fixed-bg"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <div className="luxury-overlay" />

      <motion.div
        className="luxury-content"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: false, amount: 0.4 }}
      >
        <h2>{title}</h2>
        <p>{text}</p>
      </motion.div>
    </section>
  );
}