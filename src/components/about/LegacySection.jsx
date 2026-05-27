import { motion } from "framer-motion";
import Reveal from "./Reveal";
import useParallax from "../../hooks/useParallax";

export default function LegacySection({
  eyebrow,
  title,
  paragraphs = [],
  image,
  reverse = false,
}) {
  const { ref, y } = useParallax(80);

  return (
    <section
      ref={ref}
      style={{ padding: "120px 24px" }}
    >
      <div className="about-container">
        <div
          className="split"
          style={{ alignItems: "center" }}
        >
          {!reverse && (
            <Reveal>
              <div>
                <p className="section-eyebrow">{eyebrow}</p>

                <h2 className="section-title">
                  {title}
                </h2>

                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="lead"
                    style={{
                      marginTop: i ? 14 : 18,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          )}

          <motion.div
            className="card-image"
            style={{ y }}
          >
            <img
              src={image}
              alt=""
              loading="lazy"
            />
          </motion.div>

          {reverse && (
            <Reveal>
              <div>
                <p className="section-eyebrow">{eyebrow}</p>

                <h2 className="section-title">
                  {title}
                </h2>

                {paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="lead"
                    style={{
                      marginTop: i ? 14 : 18,
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}