import mongoose, { Schema } from "mongoose";

export interface Iproduct extends Document {
  title: string;
  img: string;
  price: number;
  stock: number;
}
const productSchema = new Schema<Iproduct>({
  title: { type: String, required: true },
  img: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model<Iproduct>("Product", productSchema);

export default productModel;
