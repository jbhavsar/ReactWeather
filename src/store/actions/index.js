export const UPDATE_CITY_INFORMATION = "UPDATE_CITY_INFORMATION";

export const updateCityInformation = cityInformation => {
    return {
        type: UPDATE_CITY_INFORMATION,
        cityInformation,
    }
}