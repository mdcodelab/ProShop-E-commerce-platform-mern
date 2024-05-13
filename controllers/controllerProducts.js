import Product from "../models/productModel.js";

// Get all products  api/products
//public
export const getAllProducts = async (req, res) => {
  try {
    //pagination & total number of products
    const pageSize = 3;  //2 products per page
    const page = Number(req.query.pageNumber || 1); //the page number in the url

    const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: "i"}}
      : {};
    const numberProducts = await Product.countDocuments({...keyword});
    const products= await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))

    res.status(200).json({products, page, numberPages: Math.ceil(numberProducts/pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get single product api/products/:id
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
//create a new product
//POST api/products
//private admin
export const createProduct = async (req, res) => {
const product = await new Product({
  name: "sample name",
  price: 0,
  user: req.user._id,
  image: "/images/sample.jpg",
  brand: "sample brand",
  category: "sample category",
  countInStock: 0,
  numReviews: 0,
  description: "sample description"
});
const newProduct = await product.save();
res.status(201).json(newProduct);
}

//update product
//PUT api/products/:id
//private, admin
export const updateProduct = async (req, res) => {
  const { name, price, image, brand, category, countInStock, description } = req.body;
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.name = name;
    product.price = price;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.description = description;

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};


//delete product
//DELETE, api/products/:id
//private, admin
export const deleteProduct = async (req, res) => {
const product = await Product.findById(req.params.id);
if(product) {
  await Product.deleteOne({_id: product._id});
  res.status(200).json({message: "Product deleted."})
} else {
  res.status(404).json({message: "Resource not found."})
}
}

//MANAGING REVIEWS
//create a new review
//POST, api/products/:id/reviews
//private
export const createProductReview = async (req, res) => {
  const {rating, comment}=req.body;
const product = await Product.findById(req.params.id);
if(!product) {
  res.status(404).json({message: "Product not found."})
}
const review = {
  name: req.user.name,
  rating: Number(rating),
  comment,
  user: req.user._id
}
product.reviews.push(review);

product.numReviews = product.reviews.length;

product.rating=product.reviews.reduce((acc, review) => acc +  review.rating, 0) / product.reviews.length;

await product.save();
res.status(201).json({message: "Review added."})
}



