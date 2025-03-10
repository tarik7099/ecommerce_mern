import mongoose, { ObjectId, Schema } from "mongoose";
import { Iproduct } from "./productModel";

const CardStatusEnum  = ["active", "completed"]

export interface IcardItem extends Document {
    product : Iproduct;
    unitePrice: number;
    quantity: number;

}

export interface ICard extends Document {
    userId : ObjectId |string;
    items : IcardItem[];
    totalAmount: number;
    status: "active" | "completed"
}

export const cardItemSchema = new Schema<IcardItem>({
    product : {type : Schema.Types.ObjectId, ref :"Product", required:true},
    unitePrice : {type : Number , required:true},
    quantity : {type : Number, required:true , default: 1
    },





})
export  const cardShcema  = new Schema<ICard>({
    userId : {type : Schema.Types.ObjectId, ref : "User", required: true},
    items : [cardItemSchema],
    totalAmount : {type:Number, required: true},
    status : {type:String, enum: CardStatusEnum, required: true}

})

const cardModel =  mongoose.model<ICard>('card', cardShcema)
export default cardModel;