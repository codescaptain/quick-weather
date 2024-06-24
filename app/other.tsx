import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { GeocodeHourlyResponse, getWeatherByLocation } from "@/api/geocode";
import { getWeatherDescription } from "@/helpers/weather";

const Other = () => {
  const { location } = useLocalSearchParams() as { location: string };
  const cordination = location.split(" / ");
  const [weather, setWeather] = useState<GeocodeHourlyResponse>();

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getWeatherByLocation(
        cordination[0],
        cordination[1]
      );
      setWeather(weather);
    };
    fetchWeather();
  }, [location]);

  const renderItem = ({ item }: { item: { time: string; temp: number } }) => (
    <View>
      <Text>{new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Text>{item.temp}°C</Text>
    </View>
  );

  const data = weather?.hourly.time.map((time, index) => ({
    time,
    temp: weather?.hourly.temperature_2m[index],
  }));
  
  

  const images = {
    clearSky: require("../assets/images/clear-sky.webp"),
    mainlyClearSky: require("../assets/images/mainly-clear-sky.webp"),
    partlyCloudy: require("../assets/images/partly-cloudy.webp"),
    fog: require("../assets/images/fog.webp"),
    drizzle: require("../assets/images/drizzle.webp"),
    freezingDrizzle: require("../assets/images/freezing-drizzle.webp"),
    rain: require("../assets/images/rain.webp"),
    freezingRain: require("../assets/images/freezing-rain.webp"),
    snow: require("../assets/images/snow.webp"),
    snowGrains: require("../assets/images/snow-grains.webp"),
    snowShowers: require("../assets/images/snow-showers.webp"),
    rainShowers: require("../assets/images/default-to-partly-cloudy.webp"),
    thunderstorm: require("../assets/images/thunderstorm.webp"),
    thunderstormWithHail: require("../assets/images/thunderstorm-with-hail.webp"),
  };

  const weatherCode = weather?.daily?.weather_code[0] as string;
  const weatherBackground = getWeatherDescription(
    weatherCode
  ) as keyof typeof images;

  return (
    <>
      <SafeAreaView></SafeAreaView>
      <ImageBackground
        source={images[weatherBackground]}
        style={styles.imageContainer}
      >
        <View style={styles.bottomWeather}>
          <View style={styles.bottomContainer}>
          <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.time}
          horizontal={true}
        />
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    resizeMode: "cover",
  },
  bottomWeather: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 10,
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    width: "100%",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  bottomContainer: {},
});

export default Other;
