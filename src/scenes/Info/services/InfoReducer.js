import { LOAD_INFO_SUCCESS, LOAD_INFO_ERROR } from "./InfoActions";

export const reducer = (state = [], action) => {
    switch (action.type) {
        case LOAD_INFO_SUCCESS:
            return {...state,
                    playList: action.playList
            };
        case LOAD_INFO_ERROR:
            return {playList: [], error: action.error};
        default:
            return state;
    }
};
export default reducer;
