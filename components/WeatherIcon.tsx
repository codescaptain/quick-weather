import { getWeatherState } from '@/helpers/weather';
import React from 'react';
import {Image, StyleSheet} from "react-native";

const WeatherIcon = ({ code, customStyle }: {code: any, customStyle: any}) => {
  const weatherState = getWeatherState(code)

  
  const iconUrl = `http://openweathermap.org/img/wn/${weatherState}@2x.png`;
  return <Image source={{ uri: iconUrl }} style={[style.icon, customStyle]} />;
};

const style = StyleSheet.create({
  icon: {
    width: 50,
    height: 50,
  },
});

export default WeatherIcon;
