import { motion } from "framer-motion";
import useParallax from "../../hooks/useParallax";

export default function AboutHero({ image, eyebrow, title, subtitle }) {
  const { ref, y } = useParallax(180);

  return (
    <section
      ref={ref}
      className="about-hero"
      aria-labelledby="about-hero-title"
    >
      <motion.img
        src={image}
        alt=""
        className="about-hero__bg"
        loading="lazy"
        style={{ y }}
      />

      <div className="about-hero__content about-container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}

        <motion.h1
          id="about-hero-title"
          className="hero-title"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.3,
            }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
