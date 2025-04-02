import { produce } from 'immer'

export const games = {
    listOrders: [

    ]
}

export const dataOrderReducer = produce((state, action) => {
    switch (action.type) {
        case "LOAD_GAMES":
            state.listGames = action.payload
            return;

        case "ADD_GAME":
            state.listGames.push(action.payload);
            break;

        case "DELETE_GAME":
            return {
                ...state,
                listGames: state.listGames.filter(x => x._id != action.payload)
            };

        case "UPDATE_GAME": {
            const index = state.listGames.findIndex(game => game._id == action.payload._id);
            state.listGames[index] = { ...state.listGames[index], ...action.payload };
            break;
        }

        default:
            break;


    }
}, orders)