import express from "express"
import { allProducts, createProduct, deleteProduct, editProduct } from "../Controllers/productController.js";
import isAuthenticate from "../Middlewares/auth.js";

const productRouter = express.Router();

productRouter.post("/create-product", isAuthenticate, createProduct);
productRouter.put("/edit/:id", isAuthenticate, editProduct);
productRouter.delete("/delete/:id", isAuthenticate, deleteProduct);
productRouter.get("/allproducts", isAuthenticate, allProducts);

export default productRouter;