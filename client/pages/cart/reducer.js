export default (state = { items: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const itemsInCart = state.items;
            const itemToBeAdded = action.payload;
            const indexOfExistingItem = itemsInCart.findIndex(i => i.id == itemToBeAdded.id && i.size == itemToBeAdded.size && i.color == itemToBeAdded.color);
            if (indexOfExistingItem >= 0) {
                itemsInCart[indexOfExistingItem].quantity = Number.parseInt(itemsInCart[indexOfExistingItem].quantity) + Number.parseInt(itemToBeAdded.quantity ? itemToBeAdded.quantity : 1);
            } else {
                itemsInCart.push({ ...itemToBeAdded, quantity: itemToBeAdded.quantity || 1 });
            }

            return {
                ...state,
                items: itemsInCart
            }
    }
    return state;
}