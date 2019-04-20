export default (state = { items: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const items = state.items;
            items.push(action.payload);
            return {
                ...state,
                items
            }
    }
    return state;
}