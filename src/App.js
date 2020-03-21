import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  MenuItem,
  Grid,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import FiveDaysForecastTable from './components/FiveDaysForecastTable';
import { getCityData, getFiveDayForecast } from './services/weather.js';
import cityList from './utils/cities.json';
import CurrentForecast from './components/CurrentForecast.js';
import { updateCityInformation } from './store/actions/index.js';
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const App = ({ store, ...props }) => {
  const [city, setCity] = useState({
    id: 6087824,
    name: 'New Toronto',
    country: 'CA',
  });
  // const [cityInformation, setCityInformation] = useState({});
  const [fiveDayForecast, setFiveDayForecast] = useState({});
  const handleChange = event => {
    setCity(event.target.value);
    displaySelectedCityWeather(event.target.value);
    // setCity({ name: 'Some name ', id: 123123, country: 'CA' });
  };

  // search selectd city weather info
  const displaySelectedCityWeather = city => {
    getCityData(city)
      .then(res => {
        props.updateCityInformationState(res);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const displaySelectedCityWeatherForecast = city => {
    getFiveDayForecast(city)
      .then(forecastResp => {
        setFiveDayForecast(forecastResp.list);
      })
      .catch(err => {
        console.log('Five Day Forecast Error : ', err);
      });
  };

  return (
    <Provider store={store}>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4">Weather App</Typography>
          </Toolbar>
        </AppBar>
        <div style={{ padding: 20 }}>
          <TextField
            style={{ margin: 10 }}
            id="id"
            select
            label="City Name"
            value={city}
            onChange={handleChange}
            helperText="Please select your city"
          >
            {cityList.map(c => (
              <MenuItem key={c.id} value={c}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <CurrentForecast
            updateCityInformationState={props.updateCityInformationState}
            cityInformation={props.cityInformation}
            city={city}
            displaySelectedCityWeatherForecast={displaySelectedCityWeatherForecast}
          />
          <Card style={{ marginTop: 20, padding: 20, maxWidth: 1300 }}>
            <CardContent>
              <Typography variant="h6" style={{ paddingBottom: 20 }}>
                Weather Forcast for City: {city.name}, {city.country}
              </Typography>
              <FiveDaysForecastTable fiveDayForecast={fiveDayForecast} />
            </CardContent>
          </Card>
        </div>
      </div>
    </Provider>
  );
};

const mapStateToProps = state => ({
  cityInformation: state.cityInformation,
});

const mapDispatchToProps = dispatch => ({
  updateCityInformationState: cityInformation => {
    dispatch(updateCityInformation(cityInformation));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
