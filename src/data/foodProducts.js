const foodProducts = [
  {
    id: 1,
    title: "Hamburguesa Clásica",
    price: 8.99,
    description: "Hamburguesa de res con lechuga, tomate, cebolla y nuestra salsa especial.",
    category: "hamburguesas",
    image: "https://img.icons8.com/emoji/200/hamburger-emoji.png",
    rating: { rate: 4.5, count: 120 },
    stock: 50
  },
  {
    id: 2,
    title: "Hamburguesa con Queso",
    price: 10.49,
    description: "Jugosa hamburguesa de res con queso cheddar derretido y vegetales frescos.",
    category: "hamburguesas",
    image: "https://img.icons8.com/emoji/200/hamburger-emoji.png",
    rating: { rate: 4.7, count: 95 },
    stock: 40
  },
  {
    id: 3,
    title: "Hamburguesa BBQ",
    price: 11.99,
    description: "Hamburguesa con bacon crujiente, aros de cebolla y salsa BBQ.",
    category: "hamburguesas",
    image: "https://img.icons8.com/emoji/200/hamburger-emoji.png",
    rating: { rate: 4.8, count: 88 },
    stock: 35
  },
  {
    id: 4,
    title: "Papas Fritas Pequeñas",
    price: 2.99,
    description: "Papas fritas crujientes doradas a la perfección.",
    category: "papas",
    image: "https://img.icons8.com/emoji/200/french-fries-emoji.png",
    rating: { rate: 4.3, count: 200 },
    stock: 100
  },
  {
    id: 5,
    title: "Papas Fritas Grandes",
    price: 4.49,
    description: "Porción grande de papas fritas crujientes con sal marina.",
    category: "papas",
    image: "https://img.icons8.com/emoji/200/french-fries-emoji.png",
    rating: { rate: 4.4, count: 180 },
    stock: 80
  },
  {
    id: 6,
    title: "Papas con Queso y Bacon",
    price: 5.99,
    description: "Papas fritas cubiertas con queso fundido y trozos de bacon.",
    category: "papas",
    image: "https://img.icons8.com/emoji/200/french-fries-emoji.png",
    rating: { rate: 4.6, count: 75 },
    stock: 60
  },
  {
    id: 7,
    title: "Pizza Personal",
    price: 6.99,
    description: "Pizza individual de pepperoni con queso mozzarella.",
    category: "pizzas",
    image: "https://img.icons8.com/emoji/200/pizza-emoji.png",
    rating: { rate: 4.2, count: 150 },
    stock: 45
  },
  {
    id: 8,
    title: "Pizza Familiar",
    price: 12.99,
    description: "Pizza grande de pepperoni con ingredientes frescos.",
    category: "pizzas",
    image: "https://img.icons8.com/emoji/200/pizza-emoji.png",
    rating: { rate: 4.5, count: 130 },
    stock: 30
  },
  {
    id: 9,
    title: "Pizza Hawaiana",
    price: 11.49,
    description: "Pizza con jamón, piña y queso mozzarella.",
    category: "pizzas",
    image: "https://img.icons8.com/emoji/200/pizza-emoji.png",
    rating: { rate: 4.1, count: 90 },
    stock: 25
  },
  {
    id: 10,
    title: "Alitas de Pollo (6 piezas)",
    price: 7.49,
    description: "Alitas de pollo bañadas en salsa BBQ o picante.",
    category: "alitas",
    image: "https://img.icons8.com/emoji/200/chicken-emoji.png",
    rating: { rate: 4.6, count: 110 },
    stock: 40
  },
  {
    id: 11,
    title: "Alitas de Pollo (12 piezas)",
    price: 12.99,
    description: "Docena de alitas de pollo con tu salsa favorita.",
    category: "alitas",
    image: "https://img.icons8.com/emoji/200/chicken-emoji.png",
    rating: { rate: 4.7, count: 85 },
    stock: 35
  },
  {
    id: 12,
    title: "Alitas Picantes",
    price: 8.99,
    description: "Alitas de pollo con salsa picante estilo buffalo.",
    category: "alitas",
    image: "https://img.icons8.com/emoji/200/chicken-emoji.png",
    rating: { rate: 4.4, count: 70 },
    stock: 30
  },
  {
    id: 13,
    title: "Refresco de Cola",
    price: 1.99,
    description: "Refresco de cola bien frío 500ml.",
    category: "bebidas",
    image: "https://img.icons8.com/emoji/200/tropical-drink-emoji.png",
    rating: { rate: 4.0, count: 300 },
    stock: 200
  },
  {
    id: 14,
    title: "Malteada de Vainilla",
    price: 3.99,
    description: "Malteada cremosa de vainilla con crema batida.",
    category: "bebidas",
    image: "https://img.icons8.com/emoji/200/shake-emoji.png",
    rating: { rate: 4.8, count: 160 },
    stock: 50
  },
  {
    id: 15,
    title: "Malteada de Chocolate",
    price: 3.99,
    description: "Malteada cremosa de chocolate con crema batida.",
    category: "bebidas",
    image: "https://img.icons8.com/emoji/200/chocolate-milk-emoji.png",
    rating: { rate: 4.9, count: 140 },
    stock: 50
  },
  {
    id: 16,
    title: "Helado Sundae",
    price: 2.99,
    description: "Helado de vainilla cubierto con chocolate y nueces.",
    category: "postres",
    image: "https://img.icons8.com/emoji/200/ice-cream-emoji.png",
    rating: { rate: 4.5, count: 90 },
    stock: 60
  },
  {
    id: 17,
    title: "Pastel de Chocolate",
    price: 4.49,
    description: "Rebanada de pastel de chocolate con relleno cremoso.",
    category: "postres",
    image: "https://img.icons8.com/emoji/200/cake-emoji.png",
    rating: { rate: 4.6, count: 75 },
    stock: 25
  },
  {
    id: 18,
    title: "Combo Hamburguesa + Papas + Refresco",
    price: 12.99,
    description: "Hamburguesa clásica con papas fritas medianas y refresco.",
    category: "combos",
    image: "https://img.icons8.com/emoji/200/fast-food-emoji.png",
    rating: { rate: 4.7, count: 210 },
    stock: 30
  },
  {
    id: 19,
    title: "Combo Pizza + Refresco",
    price: 14.99,
    description: "Pizza personal con refresco y papas fritas.",
    category: "combos",
    image: "https://img.icons8.com/emoji/200/pizza-emoji.png",
    rating: { rate: 4.3, count: 95 },
    stock: 25
  },
  {
    id: 20,
    title: "Combo Familiar",
    price: 24.99,
    description: "2 hamburguesas, papas grandes, 4 alitas y 2 refrescos.",
    category: "combos",
    image: "https://img.icons8.com/emoji/200/fast-food-emoji.png",
    rating: { rate: 4.9, count: 180 },
    stock: 20
  }
];

export default foodProducts;
