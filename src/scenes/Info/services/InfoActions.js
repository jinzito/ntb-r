export const LOAD_INFO_SUCCESS = "info/info-success";
export const LOAD_INFO_ERROR = "info/info-error";
export const LOAD_INFO_REQUEST = "info/load-request";

export const loadInfo = () => async dispatch => {
    dispatch({type: LOAD_INFO_REQUEST});
    try {
        const requestURL = "http://localhost:8080/api/info/";
        const response = await fetch(requestURL, {
            method: "POST"
        });
        const info = await response.json();

        dispatch(loadInfoSuccess(info));
    } catch (error) {
        dispatch(loadInfoError(error));
    }
};

export const loadInfoSuccess = (infoData) => {
    return {type: LOAD_INFO_SUCCESS, infoData: infoData};
};

export const loadInfoError = (error) => {
    return {type: LOAD_INFO_ERROR, error: error};
};
