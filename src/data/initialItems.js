import pants from "../assets/pants.webp";
import pants1 from "../assets/pants1.jpeg";
import pants2 from "../assets/pants2.jpeg";
import shoes from "../assets/shoes.webp";
import shoes1 from "../assets/shoes1.webp";
import shoes2 from "../assets/shoes2.webp";
const initialItems = [
  {
    id: 1,
    name: "Sports Shoes",
    type: "Shoes",
    description: "Lightweight sports shoes for running.",
    coverImage: shoes,
     images: [
      shoes1,
      shoes2
    ]
  },
  {
    id: 2,
    name: "Denim Jeans",
    type: "Pant",
    description: "Classic blue denim jeans.",
    coverImage: pants,
    images: [
      pants1,
      pants2
    ]
  }
];

export default initialItems;