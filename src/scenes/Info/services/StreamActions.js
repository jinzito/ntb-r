export const DO_PLAY_STREAM = "stream/do-play-stream";
export const ON_PLAY_STREAM = "stream/on-play-stream";
export const DO_PAUSE_STREAM = "stream/do-pause-stream";
export const ON_PAUSE_STREAM = "stream/on-pause-stream";
export const ON_ERROR = "stream/on-error";

export const doPlayStream = () => {
    return {type: DO_PLAY_STREAM};
};

export const onPlayStream = () => {
    return {type: ON_PLAY_STREAM};
};

export const doPauseStream = () => {
    return {type: DO_PAUSE_STREAM};
};

export const onPauseStream = () => {
    return {type: ON_PAUSE_STREAM};
};

export const onError = () => {
    return {type: ON_ERROR};
};
