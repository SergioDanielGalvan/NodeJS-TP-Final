import fs from "fs/promises";
import path from "path";

// let products = [];

const __dirname = import.meta.dirname;
// console.log(path.join(__dirname, "products.json"))

// fs.readFile(path.join(__dirname, "products.json"), "utf-8", (error, data) => {
//   if (error) {
//     return console.error(error);
//   }

//   products = JSON.parse(data);

//   console.log(products);
// });

export const getAllProductos = async () => {
  try {
    const data = await fs.readFile(
      path.join( __dirname, "Productos.json"), "utf-8"  );

    const productos = JSON.parse(data);

    return productos;

  } catch (error) {
    console.error(error);
  }
  finally {
  }

};

export const getProductoById = async (id) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "Productoss.json"),
      "utf-8"
    );

    const productos = JSON.parse(data);

    const producto = products.find((item) => item.id == id);

    return producto;
  } catch ( error ) {
    console.error(error);
  }
    finally {
  }
};

export const createProducto = async ( nombre, precio, categorias ) => {
  const product = {
    id: Date.now(),
    nombre,
    precio,
    categorias,
  };

  try {
    const data = await fs.readFile(
      path.join(__dirname, "Productos.json"),
      "utf-8"
    );

    const products = JSON.parse(data);

    products.push(product);

    await fs.writeFile(
      path.join(__dirname, "products.json"),
      JSON.stringify(products)
    );

    return product;
  } catch (error) {
    console.error(error);
  }
      finally {
  }

};