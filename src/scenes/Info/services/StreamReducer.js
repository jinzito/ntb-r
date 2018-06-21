import { DO_PLAY_STREAM, ON_ERROR, ON_PLAY_STREAM } from "./StreamActions";

export const streamReducer = (state = {isLoading: true}, action) => {
    switch (action.type) {
        case DO_PLAY_STREAM:
            return {
                ...state,
                isLoading: true,
                isPlaying: false
            };
        case ON_PLAY_STREAM:
            return {
                ...state,
                isLoading: false,
                isPlaying: true
            };
        case ON_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return {
                ...state
            };
    }
};
export default streamReducer;
