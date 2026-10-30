export type Category = "burgers" | "combos" | "sides" | "drinks";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  category: Category;
  description: string;
  ingredients: string[];
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  spicy?: number;
  time: string;
  calories: string;
}

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "Tudo" },
  { id: "burgers", label: "Burgers" },
  { id: "combos", label: "Combos" },
  { id: "sides", label: "Porções" },
  { id: "drinks", label: "Bebidas" },
];

export const PRODUCTS: Product[] = [
  {
    id: "brasa-classico",
    name: "Brasa Clássico",
    price: 29.9,
    category: "burgers",
    description: "O rei da casa. Smash suculento na brasa com cheddar derretido e o molho secreto BiteUp.",
    ingredients: ["Pão brioche", "Smash 120g", "Cheddar", "Alface", "Tomate", "Picles", "Molho da casa"],
    image: "/images/brasa-classico.jpg",
    rating: 4.9,
    reviews: 2314,
    badge: "Mais pedido",
    badgeColor: "#FFA000",
    time: "10-15 min",
    calories: "680 kcal",
  },
  {
    id: "nobre-bacon",
    name: "Nobre Bacon",
    price: 34.9,
    category: "burgers",
    description: "Para os amantes de bacon: crocante, defumado e generoso, com cebola caramelizada.",
    ingredients: ["Pão brioche", "Smash 120g", "Cheddar duplo", "Bacon crocante", "Cebola caramelizada", "Maionese defumada"],
    image: "/images/nobre-bacon.jpg",
    rating: 4.9,
    reviews: 1892,
    badge: "Favorito",
    badgeColor: "#ff5d5d",
    time: "12-18 min",
    calories: "820 kcal",
  },
  {
    id: "double-brasa",
    name: "Double Brasa",
    price: 39.9,
    oldPrice: 44.9,
    category: "burgers",
    description: "Dois smashes prensados na chapa, cheddar triplo escorrendo e presença de respeito.",
    ingredients: ["Pão brioche", "2x Smash 120g", "Cheddar triplo", "Picles", "Alface americana", "Molho burger"],
    image: "/images/double-brasa.jpg",
    rating: 5.0,
    reviews: 3421,
    badge: "-11% hoje",
    badgeColor: "#4ade80",
    time: "12-18 min",
    calories: "1050 kcal",
  },
  {
    id: "bbq-supreme",
    name: "BBQ Supreme",
    price: 36.9,
    category: "burgers",
    description: "BBQ defumado, onion rings crocantes e provolone. O supremo da brasa americana.",
    ingredients: ["Pão brioche", "Smash 150g", "Provolone", "Onion rings", "BBQ defumado", "Bacon", "Rúcula"],
    image: "/images/bbq-supreme.jpg",
    rating: 4.8,
    reviews: 1204,
    badge: "Novo",
    badgeColor: "#60a5fa",
    spicy: 1,
    time: "12-18 min",
    calories: "910 kcal",
  },
  {
    id: "combo-classico",
    name: "Combo Clássico",
    price: 39.9,
    oldPrice: 48.8,
    category: "combos",
    description: "Brasa Clássico + batata frita crocante + refri lata. O trio perfeito pra matar a fome.",
    ingredients: ["Brasa Clássico", "Batata frita", "Refrigerante lata"],
    image: "/images/combo.jpg",
    rating: 4.9,
    reviews: 2876,
    badge: "Economize R$ 9",
    badgeColor: "#4ade80",
    time: "10-15 min",
    calories: "1150 kcal",
  },
  {
    id: "combo-nobre",
    name: "Combo Nobre",
    price: 44.9,
    oldPrice: 53.8,
    category: "combos",
    description: "Nobre Bacon + batata com cheddar e bacon + refri. Nível hard de felicidade.",
    ingredients: ["Nobre Bacon", "Batata cheddar + bacon", "Refrigerante lata"],
    image: "/images/combo.jpg",
    rating: 5.0,
    reviews: 1954,
    badge: "Melhor valor",
    badgeColor: "#FFA000",
    time: "12-18 min",
    calories: "1490 kcal",
  },
  {
    id: "batata-frita",
    name: "Batata Frita",
    price: 12.9,
    category: "sides",
    description: "Crocante por fora, macia por dentro. Corte rústico com sal especial da casa.",
    ingredients: ["Batata rústica", "Sal especial", "Páprica"],
    image: "/images/fries.jpg",
    rating: 4.7,
    reviews: 3102,
    time: "6-10 min",
    calories: "420 kcal",
  },
  {
    id: "batata-cheddar-bacon",
    name: "Batata Cheddar + Bacon",
    price: 19.9,
    category: "sides",
    description: "Batata coberta com cheddar cremoso escorrendo, bacon crocante e cebolinha.",
    ingredients: ["Batata rústica", "Cheddar cremoso", "Bacon", "Cebolinha"],
    image: "/images/cheddar-fries.jpg",
    rating: 4.9,
    reviews: 2764,
    badge: "Irrresistível",
    badgeColor: "#FFA000",
    time: "8-12 min",
    calories: "690 kcal",
  },
  {
    id: "refrigerante",
    name: "Refrigerante Lata",
    price: 6.0,
    category: "drinks",
    description: "Geladíssimo pra acompanhar. Coca, Guaraná, Laranja ou Limão. Escolha no carrinho.",
    ingredients: ["350ml", "Extra gelado"],
    image: "/images/soda.jpg",
    rating: 4.8,
    reviews: 1022,
    time: "Imediato",
    calories: "150 kcal",
  },
];

export const formatBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  stars: number;
  initials: string;
  color: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Camila Rocha",
    role: "Cliente fiel desde 2022",
    text: "O Double Brasa é simplesmente o melhor burger que já comi na vida. O cheddar escorrendo, o pão macio... virei cliente fiel na primeira mordida!",
    stars: 5,
    initials: "CR",
    color: "#FFA000",
  },
  {
    name: "Diego Martins",
    role: "Pediu 47 vezes",
    text: "Peço todo fim de semana e nunca erra. Chega quente, rápido e com aquela embalagem linda. O Combo Nobre vale cada centavo.",
    stars: 5,
    initials: "DM",
    color: "#ff5d5d",
  },
  {
    name: "Juliana Castro",
    role: "Fã de batata",
    text: "A batata com cheddar e bacon é um caso sério de vício. Cremosa, crocante, generosa. E o atendimento? Nota mil, sempre animados!",
    stars: 5,
    initials: "JC",
    color: "#4ade80",
  },
  {
    name: "Rafael Souza",
    role: "Crítico amador de burgers",
    text: "Já provei hamburgueria em tudo quanto é lugar e a BITEUP joga em outro nível. BBQ Supreme com onion rings é obra de arte.",
    stars: 5,
    initials: "RS",
    color: "#60a5fa",
  },
  {
    name: "Beatriz Lima",
    role: "Time do delivery",
    text: "Delivery mais rápido do bairro, chega em 25 min quentinho. Meus filhos são obcecados pelo Brasa Clássico. Virou tradição de sexta!",
    stars: 5,
    initials: "BL",
    color: "#c084fc",
  },
];
