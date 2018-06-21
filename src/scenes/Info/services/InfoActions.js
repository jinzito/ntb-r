export const PLAY_STREAM = "home/play-stream";
export const PAUSE_STREAM = "home/pause-stream";


export const UPDATE_INTERVAL = "home/update-interval";


export const playStream = () => {
    return {type: PLAY_STREAM};
};

export const pauseStream = () => {
    return {type: PAUSE_STREAM};
};


export const LOAD_INFO_SUCCESS = "home/load-info-success";
export const LOAD_INFO_ERROR = "home/load-info-error";
export const LOAD_INFO = "home/load-info";
export const loadInfo = () => async dispatch => {
    dispatch({type: LOAD_INFO});
    try {
        const requestURL = "http://localhost:8080/api/info/";
        const response = await fetch(requestURL, {
            method: "POST"
        });
        const info = await response.json();

        dispatch(loadInfoSuccess(info["playList"]));
    } catch (error) {
        dispatch(loadInfoError(error));
    }
};

export const loadInfoSuccess = (playList) => {
    return {type: LOAD_INFO_SUCCESS, playList: playList};
};

export const loadInfoError = (error) => {
    return {type: LOAD_INFO_ERROR, error: error};
};

export const updateInterval = (interval) => {
    return {type: UPDATE_INTERVAL, interval: interval};
};
