import Product from "../models/productModel.js";

// Get all products  api/v1/products
//public
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single product api/v1/products/:id
//public
export const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        return res.status(200).json(product);
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid product ID." });
        }
        // For other types of errors, respond with 500
        return res.status(500).json({ message: "Internal server error." });
    }
};



