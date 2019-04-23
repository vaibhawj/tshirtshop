export default (state = { items: [] }, action) => {
    const itemsInCart = state.items;
    switch (action.type) {
        case "ADD_TO_CART":
            const itemToBeAdded = action.payload;
            const indexOfExistingItem = findIndexOfItem(itemsInCart, itemToBeAdded);
            if (indexOfExistingItem >= 0) {
                itemsInCart[indexOfExistingItem].quantity = Number.parseInt(itemsInCart[indexOfExistingItem].quantity) + Number.parseInt(itemToBeAdded.quantity);
            } else {
                itemsInCart.push({ ...itemToBeAdded, quantity: itemToBeAdded.quantity});
            }

            return {
                ...state,
                items: itemsInCart
            }

        case "REMOVE_FROM_CART":
            const itemToBeRemoved = action.payload;
            itemsInCart.splice(findIndexOfItem(itemsInCart, itemToBeRemoved), 1);
            return {
                ...state,
                items: itemsInCart
            }
    }
    return state;
}

const findIndexOfItem = (items, item) => items.findIndex(i => i.id == item.id && i.size == item.size && i.color == item.color)