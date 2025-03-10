import {cartModel}  from "../models/cartModel";
import productModel from "../models/productModel";

interface CtreateCardForUser {
    userId : string;
}

const createCardforUser = async ({userId} : CtreateCardForUser) => {
    const cart = await cartModel.create({userId, totalAmount: 0})
    await cart.save();
    return cart;
}

interface GetActivieCardForUser {
    userId : string;
}
export const  getActivieCardForUser = async ({userId}: GetActivieCardForUser) => {
    let cart = await cartModel.findOne({userId, status:"active"})
    if (!cart) {
        cart = await createCardforUser({userId})
    }

    return cart;

}

interface AddItemToCart {
    productId : any;
    quantity : number;
    userId : string;
}

export const addItemToCart = async ({
    productId,
    quantity,
    userId,
  }: AddItemToCart) => {
    const cart = await getActivieCardForUser({ userId });
  
    // Does the item exist in the cart ?
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productId
    );
    if (existsInCart) {
        return {data:"item alteady exists in card", statusCode : 403}
    }
    const product = await productModel.findById(productId);
    if (!product) {
        return {data: "Product not exists ", statusCode: 400}

    }
    if (product.stock < quantity ) {
        return {data: "Low stock for this item"  , statusCode: 400}
    }
    cart.items.push({
        product: productId,
        unitPrice : product.price,
        quantity
    });

    cart.totalAmount += product.price * quantity;
    const updateCard = await cart.save();

    return {data: updateCard, statusCode : 200}
}
  