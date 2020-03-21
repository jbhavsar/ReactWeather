import React from 'react';
import {
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
} from '@material-ui/core';
const CurrentForecast = ({ city, updateCityInformationState, cityInformation, displaySelectedCityWeatherForecast, ...props }) => {
    return (
        <Card style={{ padding: 20, maxWidth: 450 }}>
            <CardContent>
                <Grid container>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="h6">
                                    City: {city.name}, {city.country}
                                </Typography>
                                <Typography>
                                    Weather:{' '}
                                    {Object.keys(cityInformation).length > 0
                                        ? cityInformation.weather[0].main
                                        : '-'}
                                </Typography>
                                <Typography>
                                    Details:{' '}
                                    {Object.keys(cityInformation).length > 0
                                        ? cityInformation.weather[0].description
                                        : '-'}
                                </Typography>
                                <Typography>
                                    Temperature:{' '}
                                    {Object.keys(cityInformation).length > 0
                                        ? Math.ceil(cityInformation.main.temp - 273.15) + '°C'
                                        : '-'}
                                </Typography>
                                <Typography>
                                    Wind Speed:{' '}
                                    {Object.keys(cityInformation).length > 0
                                        ? cityInformation.wind.speed
                                        : '-'}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        {'weather' in cityInformation && (
                            <Grid container justify="center" alignItems="center">
                                <Grid item>
                                    <img
                                        style={{ width: 150 }}
                                        src={`https://openweathermap.org/img/wn/${cityInformation.weather[0].icon}@2x.png`}
                                        alt="Weather Icon"
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
            <Button
                style={{ width: '100%' }}
                color="primary"
                variant="contained"
                onClick={() => {
                    displaySelectedCityWeatherForecast(city);
                }}
            >
                5 Day Forecast
            </Button>
        </Card>
    )
}


export default CurrentForecast;