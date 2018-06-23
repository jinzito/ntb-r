import { ON_CAN_PLAY } from "./StreamActions";
import { DO_CHANGE_PRESET_RANDOM, ON_INITED, ON_PRESET_CHANGED } from "./VisualizerActions";

const defaultState = {
    inited: false,
    doInitVisualizer: false,
    currentPresetName: "",
    doChangePreset: false
};

export const visualizerReducer = (state = defaultState, action) => {
    switch (action.type) {

        case ON_CAN_PLAY:
            return {
                ...state,
                doInitVisualizer: true
            };
        case ON_INITED: {
            return {
                ...state,
                doInitVisualizer: false,
                inited: true
            }
        }
        case ON_PRESET_CHANGED:
            return {
                ...state,
                doInitVisualizer: false,
                doChangePreset: false,
                currentPresetName: action.presetName
            };
        case DO_CHANGE_PRESET_RANDOM:
            if (!state.inited) {
                return {...state};
            } else {
                return {
                    ...state,
                    doChangePreset: true
                };
            }
        default:
            return {
                ...state
            };
    }
};

export default visualizerReducer;
