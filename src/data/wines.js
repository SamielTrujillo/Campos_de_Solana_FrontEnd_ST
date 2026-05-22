// ─── WINE DATA / DATOS DE VINOS ──────────────────────────────────────────────

import vinoTannat from "../assets/wines/Tinto/InnovanteMarselan.png";

import innovanteRose from "../assets/wines/Rose/InnovanteRosé.png";

import unicoTannat from "../assets/wines/Tinto/ÚnicoDarkTannat.png";

import innovanteRiesling from "../assets/wines/Blanco/InnovanteRiesling.png";

import vinoBlanco from "../assets/wines/Blanco/BlancoClasico.png";

import malbecCabernet from "../assets/wines/Tinto/InnovanteMalbecCaberneSauvignon.png";

import innovanteTannat from "../assets/wines/Tinto/InnovanteTannat.png";

import arteEncuentro from "../assets/wines/Tinto/ElArtedelEncuentro.png";

import oporto from "../assets/wines/Dulce/Oporto.png";

const wines = [
  {
    id: 1,
    name: "BIVARIETAL TINTO",
    year: 2022,
    category: "Tinto",
    region: "Tarija, Bolivia",
    price: 86.0,
    stock: 100,

    description:
      "Este vino se trabaja a partir de uvas Tannat de Los Cipreses, nuestra finca más grande, junto con Marselan de Finca Legado.",

    image: vinoTannat,

    tags: ["Tannat", "Marselan", "Tarija"],

    featured: true,
  },

  {
    id: 2,
    name: "INNOVANTE ROSÉ",
    year: 2023,
    category: "Rosé",
    region: "Tarija, Bolivia",
    price: 120.0,
    stock: 100,

    description:
      "Elaborado con uvas Malbec y Marselan, integra el carácter frutal de las primeras con la frescura y expresión de las segundas, obteniendo un vino muy agradable.",

    image: innovanteRose,

    tags: ["Malbec", "Marselan", "Fresco"],

    featured: true,
  },

  {
    id: 3,
    name: "ÚNICO TANNAT",
    year: 2023,
    category: "Tinto",
    region: "Tarija, Bolivia",
    price: 110.0,
    stock: 0,

    description:
      "Fermentación maloláctica en barricas de tercer uso y posterior crianza en barricas ex bourbon traídas desde Kentucky durante 1 año.",

    image: unicoTannat,

    tags: ["Tannat", "Bourbon Barrel", "Premium"],

    featured: true,
  },

  {
    id: 4,
    name: "INNOVANTE RIESLING",
    year: 2023,
    category: "Blanco",
    region: "Santa Ana, Tarija",
    price: 77.0,
    stock: 100,

    description:
      "Variedad alemana adaptada a los valles tarijeños de Santa Ana. La amplitud térmica favorece una uva que produce vinos muy frescos.",

    image: innovanteRiesling,

    tags: ["Riesling", "Blanco", "Fresco"],

    featured: false,
  },

  {
    id: 5,
    name: "BLANCO",
    year: 2023,
    category: "Blanco",
    region: "Tarija, Bolivia",
    price: 19.0,
    stock: 100,

    description:
      "Vino elaborado a partir de uvas provenientes de los valles centrales de Tarija, una zona de alta luminosidad y pureza de ambiente.",

    image: vinoBlanco,

    tags: ["Blanco", "Clásico", "Ligero"],

    featured: false,
  },

  {
    id: 6,
    name: "MALBEC CABERNET SAUVIGNON",
    year: 2021,
    category: "Tinto",
    region: "Los Cipreses, Tarija",
    price: 80.0,
    stock: 100,

    description:
      "Vino elaborado con uvas Malbec y Cabernet Sauvignon de los viñedos más antiguos de la finca Los Cipreses, con crianza de 9 meses en barricas de roble.",

    image: malbecCabernet,

    tags: ["Malbec", "Cabernet", "Roble"],

    featured: false,
  },

  {
    id: 7,
    name: "INNOVANTE TANNAT",
    year: 2022,
    category: "Tinto",
    region: "Tarija, Bolivia",
    price: 100.0,
    stock: 35,

    description:
      "La expansión de los viñedos de Tannat permite producir un vino de estilo joven, con fruta disponible y gran carácter varietal.",

    image: innovanteTannat,

    tags: ["Tannat", "Joven", "Varietal"],

    featured: true,
  },

  {
    id: 8,
    name: "EL ARTE DEL ENCUENTRO",
    year: 2023,
    category: "Tinto",
    region: "Tarija, Bolivia",
    price: 60.0,
    stock: 100,

    description:
      "Vino fresco y afrutado, de cuerpo medio y agradable en boca. Es un coupage elegante de Tannat y Malbec adaptados a la región.",

    image: arteEncuentro,

    tags: ["Tannat", "Malbec", "Coupage"],

    featured: false,
  },

  {
    id: 9,
    name: "OPORTO",
    year: 2025,
    category: "Dulce",
    region: "Tarija, Bolivia",
    price: 30.0,
    stock: 40,

    description:
      "Vino dulce de corte tipo Oporto, obtenido de la sobremaduración de uvas seleccionadas de los valles tarijeños.",

    image: oporto,

    tags: ["Dulce", "Oporto", "Premium"],

    featured: true,
  },
];

export default wines;