import fetch from "unfetch";

export async function callApi(path, data = {}) {

    const result = (isSuccess, data = {}, errorMessage = undefined) => {
        return {
            isSuccess,
            data,
            errorMessage,
        }
    }

    const apiUrl = '/api' + path;
    const body = JSON.stringify(data);

    const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body,
    });

    // Try extracting the result JSON
    let jsonData = {};
    try {
        jsonData = await apiResponse.json();
    } catch (e) {
        jsonData = {};
    }

    if (apiResponse.status === 200 || apiResponse.status === 201) {
        return result(true, jsonData);
    }

    let errorMessage;
    if (jsonData.message) {
        errorMessage = jsonData.message;
    } else if (apiResponse.statusText) {
        errorMessage = apiResponse.statusText;
    } else {
        errorMessage = 'Unrecognized error in API response.';
    }

    return result(false, jsonData, errorMessage);
}