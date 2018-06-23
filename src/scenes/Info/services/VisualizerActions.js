export const ON_INITED = "visualizer/on-inited";
export const DO_CHANGE_PRESET_RANDOM = "visualizer/do-change-preset-random";
export const ON_PRESET_CHANGED = "visualizer/on-preset-changed";

export const doChangePresetRandom = () => {
    return {type: DO_CHANGE_PRESET_RANDOM};
};

export const onPresetChanged = (presetName) => {
    return {type: ON_PRESET_CHANGED, presetName: presetName};
};

export const onInited = () => {
    return {type: ON_INITED};
};
