import axios from 'axios';

const getCityData = (city) => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.openweathermap.org/data/2.5/weather?id=' + city.id + '&appid=a30f79a44d74a7b2c4c8f414d958a23e')
            .then(res => {
                resolve({ ...res.data });
            }).catch(err => {
                console.log(err);
                reject(new Error(err));
            });
    })
};

const getFiveDayForecast = (city) => {
    return new Promise((resolve, reject) => {
        axios.get('http://api.openweathermap.org/data/2.5/forecast?id=' + city.id + '&appid=a30f79a44d74a7b2c4c8f414d958a23e')
            .then(res => {
                resolve({ ...res.data });
            }).catch(err => {
                console.log(err);
                reject(new Error(err));
            });
    })
};

export { getCityData, getFiveDayForecast };
