import { faker } from "@faker-js/faker";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

const NUM_PRODUCTS = 10000;

function generateProduct(id: number): Product {
  return {
    id: id.toString(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
    image: faker.image.urlLoremFlickr({
      width: 200,
      height: 200,
      category: "tech",
    }),
  };
}

const allProducts: Product[] = Array.from({ length: NUM_PRODUCTS }, (_, idx) =>
  generateProduct(idx + 1)
);

export default allProducts;
