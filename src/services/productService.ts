import productModel from "../models/productModel";

export const getAllproducts = async () => {
  return await productModel.find();
};

export const seedInitailProducts = async () => {
  const products = [
    {
      title: "Dell 1",
      img: "https://imgs.search.brave.com/DeBxXRngNiHqWMgz1_ldd5RxRZCN2whkCjvZ6Y5we2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjE5U3BnMU1ERUwu/anBn",
      price: 10,
      stock: 10,
    },
    {
      title: "Dell 2 ",
      img: "https://imgs.search.brave.com/DeBxXRngNiHqWMgz1_ldd5RxRZCN2whkCjvZ6Y5we2Y/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NjE5U3BnMU1ERUwu/anBn",
      price: 10,
      stock: 10,
    },
  ];
  const existingProducts = await getAllproducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
