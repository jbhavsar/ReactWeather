import initialState from '../state';
import { UPDATE_CITY_INFORMATION } from '../actions';

const weatherApp = (state=initialState, action) => {
    switch(action.type) {
        case UPDATE_CITY_INFORMATION:
            return {
                ...state,
                cityInformation:{...action.cityInformation}
            }
        default:
            return state;
    }
}

export default weatherApp;
