import "../styles/about.css";

import AboutHero from "../components/about/AboutHero";
import LegacySection from "../components/about/LegacySection";
import Timeline from "../components/about/Timeline";
import AwardsSection from "../components/about/AwardsSection";
import Manifesto from "../components/about/Manifesto";
import Gallery from "../components/about/Gallery";

import vineyard1 from "../assets/about/campos-vinedo.jpg";
import vineyard2 from "../assets/about/vinedo-plantaciones.jpg";
import vineyard3 from "../assets/about/plantaciones.jpg";
/*import vineyardFamily from "../assets/about/foto-familia-con-vinedo.jpg";*/
import winery1 from "../assets/about/bodega-1-central.png";
import winery2 from "../assets/about/bodega-2-costado.jpg";
import signImg from "../assets/about/campos-letrero.jpg";
import luxuryWineImg from "../assets/about/innovante-vinos.png";
import restaurantImg from "../assets/about/salon-comiendo.jpg";
import workerImg from "../assets/about/trabajador-plantaciones.jpg";
import founderImg from "../assets/about/foto-familia-con-vinedo.jpg";
import estherOrtiz from "../assets/about/esther-ortiz.png";
import winesVarious from "../assets/about/vinos-varios.jpg";
import LuxurySection from "../components/about/LuxurySection";

export default function AboutPage() {
  const timelineItems = [
    {
      year: "1920",
      title: "Fundación",
      desc: "Los primeros viñedos plantados con una visión familiar que perdura.",
    },
    {
      year: "1978",
      title: "Expansión",
      desc: "Adopción de técnicas modernas y primeras exportaciones regionales.",
    },
    {
      year: "2005",
      title: "Reconocimiento",
      desc: "Premios internacionales y consolidación como bodega premium.",
    },
    {
      year: "2020",
      title: "Innovación",
      desc: "Combinamos tradición y tecnología para vinos de altura.",
    },
  ];

  const awards = [
    {
      title: "Medalla de Oro - International Wine",
      desc: "Excelencia en Cabernet Sauvignon.",
    },
    {
      title: "Selección de la Crítica",
      desc: "Reconocimiento por prácticas sostenibles y calidad.",
    },
    {
      title: "Mejor Etiqueta 2019",
      desc: "Diseño editorial y presentación premium.",
    },
  ];

  const gallery = [
    vineyard1,
    vineyard2,
    vineyard3,
    winery1,
    winery2,
    restaurantImg,
    workerImg,
    signImg,
  ];

  return (
    <div className="about-page">
      <AboutHero
        image={winesVarious}
        eyebrow="Historia de amor por el buen vino"
        title={"Donde la tradición y la innovación se fusionan"}
        subtitle={
          "Más de 100 años de legado vitivinícola en los valles de Tarija."
        }
      />

      <LegacySection
        eyebrow="Nuestra esencia"
        title={"El arte de crear\nvinos de altura"}
        paragraphs={[
          "Campos de Solana representa una de las bodegas más reconocidas de Bolivia, ubicada en los valles de Tarija, una región privilegiada por su altitud, clima y terroir excepcional.",
          "Cada botella nace de la combinación entre tradición vitivinícola, innovación y pasión por crear vinos capaces de competir a nivel internacional.",
        ]}
        image={luxuryWineImg}
      />

      <LegacySection
        eyebrow="Legado"
        title={"Una visión que transformó la viticultura boliviana"}
        paragraphs={[
          "Con una apuesta por la excelencia y el potencial de los valles tarijeños, Campos de Solana logró posicionarse como un referente del vino premium en Bolivia.",
          "Su historia refleja años de dedicación, innovación y compromiso con la calidad, manteniendo siempre la identidad y esencia de sus tierras.",
        ]}
        image={founderImg}
        reverse={true}
      />

      <Timeline items={timelineItems} />

      

      <LuxurySection
        image={estherOrtiz}
        title="Una experiencia inspirada en el lujo"
        text="Más que vinos, Campos de Solana ofrece momentos, tradición y una conexión auténtica con el terroir boliviano."
      />

      <AwardsSection image={luxuryWineImg} awards={awards} />

      <LegacySection
        eyebrow="Pasión"
        title={"Cada cosecha cuenta una historia"}
        paragraphs={[
          "Detrás de cada botella existe el esfuerzo de personas comprometidas con preservar la calidad y el carácter único de los vinos bolivianos.",
          "Campos de Solana continúa construyendo un legado que representa orgullo, tradición y excelencia para Bolivia.",
        ]}
        image={workerImg}
      />

      <div style={{ padding: "40px 24px 120px" }}>
        <div
          className="about-container"
          style={{ maxWidth: 1280, margin: "0 auto" }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: 34,
              boxShadow: "0 25px 60px rgba(0,0,0,0.16)",
            }}
          >
            <img
              src={signImg}
              alt="Campos de Solana"
              style={{
                width: "100%",
                height: 520,
                objectFit: "cover",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      <Gallery images={gallery} />

      <Manifesto
        title={"Nuestro Manifesto"}
        text={
          "Creemos en el terroir, en la paciencia, en la honestidad del fruto. Cada botella es un puente entre la tierra y quien la disfruta."
        }
      />
    </div>
  );
}
