import { LOAD_INFO_ERROR, LOAD_INFO_REQUEST, LOAD_INFO_SUCCESS } from "./InfoActions";

export const reducer = (state = {}, action) => {
    switch (action.type) {
        case LOAD_INFO_REQUEST:
            return {
                ...state,
                isLoading: true,
                infoData: null,
                onAirTitle: "nothing",
                error: null
            };
        case LOAD_INFO_SUCCESS:
            const infoData = action.infoData;
            const onAirTitle = infoData["onAir"] ? infoData["onAir"].title: "";
            return {
                ...state,
                isLoading: false,
                infoData: infoData,
                onAirTitle: onAirTitle,
                error: null
            };
        case LOAD_INFO_ERROR:
            return {
                ...state,
                isLoading: false,
                infoData: null,
                onAirTitle: "nothing",
                error: action.error
            };
        default:
            return state;
    }
};
export default reducer;
