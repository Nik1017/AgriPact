import productModel from "../Models/productModel.js";

export const createProduct = async (req, res) => {
    try {
        const { title, address, photos, description, parks, price } = req.body;

        if (!title || !description) {
            return res.status(400).json({ success: false, message: "Title and description are required" });
        }

        const newProduct = await productModel.create({
            title,
            address,
            photos,
            description,
            parks,
            price
        });

        res.status(200).json({
            message: "Product created Successfully!!!",
            newProduct
        })

    } catch (error) {
        res.status(500).json({
            message: "Error in creation of a Product",
            error: error.message
        })
    }
}

export const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedProducts = await productModel.findByIdAndUpdate(id, updates, {new: true});

        if(!updatedProducts) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product Updated Successfully",
            updatedProducts
        })

    } catch (error) {
        res.status(500).json({
            message: "Error in Updation of Product",
            error: error.message
        })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if(!deleteProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        res.status(200).json({
            message: "Product deleted Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in Deleted Product Logic",
            error: error.message
        })
    }
}

export const allProducts = async (req, res) => {
    try {
        const products = await productModel.find();
        if (!products) {
            return res.status(400).json({
                message: "No Products Found"
            })
        }
        res.status(200).json({
            message: " All Products are: ",
            products,
        })
    } catch (error) {
        res.status(500).json({
            message: "Error in all Products controller",
            error: error.message
        })
    }
}
