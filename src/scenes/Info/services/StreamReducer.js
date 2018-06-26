import { DO_PAUSE_STREAM, DO_PLAY_STREAM, ON_ERROR, ON_PAUSE_STREAM, ON_PLAY_STREAM } from "./StreamActions";

export const streamReducer = (state = {isLoading: true, isPlaying: false}, action) => {
    switch (action.type) {
        case DO_PLAY_STREAM:
            return {
                ...state,
                isLoading: true,
                isPlaying: false,
                doPlay: true
            };
        case ON_PLAY_STREAM:
            return {
                ...state,
                isLoading: false,
                isPlaying: true,
                doPlay: undefined
            };
        case DO_PAUSE_STREAM:
            return {
                ...state,
                isLoading: false,
                isPlaying: false,
                doPause: true
            }
        case ON_PAUSE_STREAM:
            return {
                ...state,
                isLoading: false,
                isPlaying: false,
                doPause: undefined
            };
        case ON_ERROR:
            return {
                ...state,
                error: action.error,
            };
        default:
            return {
                ...state
            };
    }
};
export default streamReducer;
