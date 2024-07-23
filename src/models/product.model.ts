import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    size: {
        type: String,
        required: true
    }
},{timestamps: true}
);

const productModel = mongoose.model("product", productSchema);

export default productModel