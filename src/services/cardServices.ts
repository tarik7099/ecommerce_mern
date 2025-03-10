import cardModel from "../models/cardModel";

interface CtreateCardForUser {
    userId : string;
}

const createCardforUser = async ({userId} : CtreateCardForUser) => {
    const card = await cardModel.create({userId, totalAmount: 0})
    await card.save();
    return card;
}

interface GetActivieCardForUser {
    userId : string;
}
export const  getActivieCardForUser = async ({userId}: GetActivieCardForUser) => {
    let cart = await cardModel.findOne({userId, status:"active"})
    if (!cart) {
        cart = await createCardforUser({userId})
    }

}
