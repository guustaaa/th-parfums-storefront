import type { Gender, OlfactoryFamily, Product } from "@/lib/types";

interface SeedInput {
  slug: string;
  name: string;
  brand?: string;
  gender: Gender;
  family: OlfactoryFamily;
  inspired_by?: string;
  featured?: boolean;
  isNew?: boolean;
  description: string;
  notes?: { top?: string[]; heart?: string[]; base?: string[] };
  images: string[]; // file names under /products
  /** prices in cents */
  price50: number;
  price100: number;
  sale50?: number;
  sale100?: number;
  sort: number;
}

function mk(s: SeedInput): Product {
  return {
    id: s.slug,
    slug: s.slug,
    name: s.name,
    brand: s.brand ?? "THPARFUMS",
    description: s.description,
    gender: s.gender,
    family: s.family,
    inspired_by: s.inspired_by ?? null,
    is_featured: !!s.featured,
    is_new: !!s.isNew,
    is_active: true,
    sort: s.sort,
    notes: s.notes ?? null,
    images: s.images.map((file, i) => ({
      id: `${s.slug}-img-${i}`,
      url: `/products/${file}`,
      alt: `${s.name} — ${s.brand ?? "THPARFUMS"}`,
      sort: i,
      is_primary: i === 0,
    })),
    variants: [
      {
        id: `${s.slug}-50`,
        volume_ml: 50,
        price_cents: s.price50,
        sale_price_cents: s.sale50 ?? null,
        sku: `${s.slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)}-50`,
        stock: 20,
      },
      {
        id: `${s.slug}-100`,
        volume_ml: 100,
        price_cents: s.price100,
        sale_price_cents: s.sale100 ?? null,
        sku: `${s.slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)}-100`,
        stock: 20,
      },
    ],
  };
}

// Catalog identified from the real bottle photos (árabes, designers e nicho).
// Prices are market-average references in BRL — fine-tune in the admin.
export const SEED_PRODUCTS: Product[] = [
  mk({
    slug: "afnan-9pm",
    name: "9PM",
    brand: "Afnan",
    gender: "masc",
    family: "oriental",
    featured: true,
    description:
      "Um dos árabes mais amados: doce, especiado e viciante, com excelente fixação e projeção para a noite.",
    notes: {
      top: ["Maçã", "Lavanda", "Canela"],
      heart: ["Âmbar", "Orris"],
      base: ["Baunilha", "Tonka", "Madeiras"],
    },
    images: ["p11.jpg"],
    price50: 13500,
    price100: 26900,
    sort: 1,
  }),
  mk({
    slug: "amber-empire",
    name: "Amber Empire",
    brand: "French Avenue",
    gender: "masc",
    family: "amadeirado",
    featured: true,
    description:
      "Âmbar opulento e madeiras escuras. Presença marcante e sofisticada que não passa despercebida.",
    notes: {
      top: ["Pimenta rosa", "Bergamota"],
      heart: ["Âmbar", "Incenso"],
      base: ["Baunilha", "Madeiras"],
    },
    images: ["p01.jpg"],
    price50: 19500,
    price100: 32900,
    sort: 2,
  }),
  mk({
    slug: "azure-aoud",
    name: "Azzure Aoud",
    gender: "masc",
    family: "oriental",
    featured: true,
    description:
      "Oud refinado com um toque fresco e especiado. Masculino, encorpado e elegante.",
    images: ["p03.jpg"],
    price50: 16500,
    price100: 32900,
    sort: 3,
  }),
  mk({
    slug: "liquid-brun",
    name: "Liquid Brun",
    gender: "masc",
    family: "amadeirado",
    featured: true,
    description:
      "Madeiras quentes e fumê com um fundo doce e resinoso. Intenso e viciante.",
    images: ["p09.jpg"],
    price50: 18000,
    price100: 35900,
    sort: 4,
  }),
  mk({
    slug: "royal-blend",
    name: "Royal Blend",
    gender: "masc",
    family: "amadeirado",
    description:
      "Mistura nobre de madeiras e especiarias. Sóbrio, versátil e de ótima fixação.",
    images: ["p06.jpg"],
    price50: 15000,
    price100: 29900,
    sort: 5,
  }),
  mk({
    slug: "club-de-nuit-precieux",
    name: "Club de Nuit Precieux",
    brand: "Armaf",
    gender: "unisex",
    family: "oriental",
    featured: true,
    description:
      "Da aclamada linha Club de Nuit: âmbar, oud e especiarias em uma composição luxuosa e encorpada.",
    images: ["p05.jpg"],
    price50: 23500,
    price100: 46900,
    sort: 6,
  }),
  mk({
    slug: "badee-al-oud",
    name: "Badee Al Oud",
    brand: "Lattafa",
    gender: "unisex",
    family: "oriental",
    featured: true,
    description:
      "Oud aveludado com rosa e frutas escuras. Um clássico moderno de alta fixação.",
    notes: {
      top: ["Frutas vermelhas"],
      heart: ["Oud", "Rosa"],
      base: ["Âmbar", "Madeiras"],
    },
    images: ["p04.jpg"],
    price50: 17500,
    price100: 34900,
    sort: 7,
  }),
  mk({
    slug: "khamrah",
    name: "Khamrah",
    brand: "Lattafa",
    gender: "unisex",
    family: "oriental",
    featured: true,
    isNew: true,
    description:
      "Gourmand especiado: canela, tâmara e baunilha em um acorde quente e adocicado. Fenômeno de vendas.",
    notes: {
      top: ["Canela", "Noz-moscada", "Bergamota"],
      heart: ["Tâmara", "Praliné", "Tuberosa"],
      base: ["Baunilha", "Tonka", "Benjoim"],
    },
    images: ["p10.jpg"],
    price50: 14900,
    price100: 23900,
    sort: 8,
  }),
  mk({
    slug: "royal-amber",
    name: "Royal Amber",
    brand: "Orientica",
    gender: "unisex",
    family: "oriental",
    featured: true,
    description:
      "Âmbar luxuoso e resinoso com madeiras nobres. Sofisticado, quente e de longuíssima duração.",
    images: ["p22.jpg"],
    price50: 27500,
    price100: 54900,
    sort: 9,
  }),
  mk({
    slug: "odyssey-marshmallow",
    name: "Odyssey Marshmallow",
    brand: "Armaf",
    gender: "unisex",
    family: "frutal",
    isNew: true,
    description:
      "Doce e cremoso como marshmallow, com frutas e um fundo amadeirado. Confortável e cativante.",
    images: ["p07.jpg", "p27.jpg"],
    price50: 17500,
    price100: 34900,
    sort: 10,
  }),
  mk({
    slug: "supremacy",
    name: "Supremacy",
    brand: "Armaf",
    gender: "unisex",
    family: "oriental",
    description:
      "Encorpado e especiado, com madeiras e âmbar. Presença forte para ocasiões marcantes.",
    images: ["p08.jpg"],
    price50: 16500,
    price100: 32900,
    sort: 11,
  }),
  mk({
    slug: "abyad",
    name: "Abyad",
    brand: "Al Wataniah",
    gender: "unisex",
    family: "floral",
    description:
      "Flores brancas luminosas e limpas sobre um fundo amadeirado e suave. Elegante e versátil.",
    images: ["p30.jpg"],
    price50: 15000,
    price100: 30000,
    sort: 12,
  }),
  mk({
    slug: "rayhaan",
    name: "Rayhaan",
    brand: "Rasasi",
    gender: "unisex",
    family: "oriental",
    description:
      "Oriental encorpado com âmbar e especiarias. Quente, acolhedor e marcante.",
    images: ["p02.jpg", "p13.jpg"],
    price50: 14500,
    price100: 28900,
    sort: 13,
  }),
  mk({
    slug: "yara",
    name: "Yara",
    brand: "Lattafa",
    gender: "fem",
    family: "floral",
    featured: true,
    description:
      "Floral doce e cremoso com orquídea, heliotrópio e tâmara. Feminino, marcante e queridinho do público.",
    notes: {
      top: ["Orquídea", "Tâmara"],
      heart: ["Heliotrópio", "Frutas tropicais"],
      base: ["Baunilha", "Sândalo", "Almíscar"],
    },
    images: ["p33.jpg", "p34.jpg"],
    price50: 16000,
    price100: 27000,
    sort: 14,
  }),
  mk({
    slug: "eclaire",
    name: "Eclaire",
    brand: "Lattafa",
    gender: "fem",
    family: "floral",
    featured: true,
    isNew: true,
    description:
      "Gourmand luminoso e doce, com caramelo, frutas e flores. Festivo e envolvente.",
    notes: {
      top: ["Frutas vermelhas", "Pêra"],
      heart: ["Caramelo", "Flor de laranjeira"],
      base: ["Baunilha", "Tonka"],
    },
    images: ["p14.jpg"],
    price50: 17500,
    price100: 34900,
    sort: 15,
  }),
  mk({
    slug: "mayar",
    name: "Mayar",
    brand: "Lattafa",
    gender: "fem",
    family: "floral",
    featured: true,
    description:
      "Floral frutado radiante, suave e elegante. Delicado para o dia a dia com toque de sofisticação.",
    images: ["p20.jpg"],
    price50: 18000,
    price100: 36000,
    sort: 16,
  }),
  mk({
    slug: "athena",
    name: "Athena",
    brand: "Maison Alhambra",
    gender: "fem",
    family: "floral",
    featured: true,
    isNew: true,
    description:
      "Floral branco luminoso e sofisticado, com lírio-do-vale e baunilha. Elegância atemporal.",
    images: ["p19.jpg"],
    price50: 16500,
    price100: 33000,
    sort: 17,
  }),
  mk({
    slug: "club-de-nuit-maleka",
    name: "Club de Nuit Maleka",
    brand: "Armaf",
    gender: "fem",
    family: "floral",
    featured: true,
    description:
      "Floral frutado opulento e feminino da linha Club de Nuit. Marcante, doce e de ótima fixação.",
    images: ["p24.jpg", "p25.jpg"],
    price50: 19000,
    price100: 37900,
    sort: 18,
  }),
  mk({
    slug: "ajwad",
    name: "Ajwad",
    brand: "Lattafa",
    gender: "fem",
    family: "floral",
    isNew: true,
    description:
      "Floral frutado refinado e doce, com frutas vermelhas e baunilha. Versátil e elegante.",
    images: ["p12.jpg", "p17.jpg"],
    price50: 16500,
    price100: 27400,
    sort: 19,
  }),
  mk({
    slug: "watani",
    name: "Watani",
    brand: "Al Wataniah",
    gender: "fem",
    family: "floral",
    description:
      "Buquê floral encorpado e marcante, com fundo quente. Feminino e sofisticado.",
    images: ["p15.jpg"],
    price50: 15000,
    price100: 30000,
    sort: 20,
  }),
  mk({
    slug: "sabah-al-ward",
    name: "Sabah Al Ward",
    brand: "Al Wataniah",
    gender: "fem",
    family: "floral",
    description:
      "Rosas e flores luminosas em uma composição doce e elegante. Romântico e duradouro.",
    images: ["p16.jpg", "p23.jpg", "p29.jpg"],
    price50: 14500,
    price100: 28900,
    sort: 21,
  }),
  mk({
    slug: "ameerati",
    name: "Ameerati",
    brand: "Al Wataniah",
    gender: "fem",
    family: "oriental",
    description:
      "Oriental doce e acolhedor, com baunilha e âmbar. Confortável e marcante por um ótimo custo.",
    images: ["p18.jpg"],
    price50: 8000,
    price100: 16000,
    sort: 22,
  }),
  mk({
    slug: "reyna",
    name: "Reyna",
    brand: "Al Wataniah",
    gender: "fem",
    family: "floral",
    description:
      "Floral elegante e luminoso, suave e feminino. Perfeito para o dia a dia.",
    images: ["p31.jpg"],
    price50: 14500,
    price100: 29000,
    sort: 23,
  }),
  mk({
    slug: "pretty-in-pink",
    name: "Pretty in Pink",
    brand: "Rayhaan",
    gender: "fem",
    family: "floral",
    description:
      "Floral frutado alegre e doce, jovem e cativante. Leve e charmoso.",
    images: ["p26.jpg"],
    price50: 14500,
    price100: 28900,
    sort: 24,
  }),
  mk({
    slug: "noble-blush",
    name: "Badee Al Oud Noble Blush",
    brand: "Lattafa",
    gender: "fem",
    family: "oriental",
    isNew: true,
    description:
      "Da linha Badee Al Oud: frutas vermelhas, rosa e oud em um acorde feminino, doce e encorpado.",
    images: ["p32.jpg"],
    price50: 16500,
    price100: 33000,
    sort: 25,
  }),
  mk({
    slug: "ck-one-shock-her",
    name: "CK One Shock For Her",
    brand: "Calvin Klein",
    gender: "fem",
    family: "frutal",
    description:
      "Designer original: frutado e floral com fundo amadeirado adocicado. Moderno e sensual.",
    images: ["p21.jpg"],
    price50: 24500,
    price100: 49000,
    sort: 26,
  }),
  mk({
    slug: "jpg-scandal",
    name: "Scandal",
    brand: "Jean Paul Gaultier",
    gender: "fem",
    family: "oriental",
    description:
      "Designer original: mel, gardênia e patchouli em um gourmand floral marcante e sedutor.",
    images: ["p28.jpg"],
    price50: 24500,
    price100: 49000,
    sort: 27,
  }),
];
