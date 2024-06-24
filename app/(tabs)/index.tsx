import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { SetStateAction, useEffect, useState } from "react";
import { GeocodeHourlyResponse, getGeocodeHourly } from "@/api/geocode";
import { Location } from "@/api/location";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import axios from "axios";
import Dropdown from "react-native-input-select";
import WeatherIcon from "@/components/WeatherIcon";

const Page = () => {
  const GECODE_URL = process.env.EXPO_PUBLIC_GECODE_URL;
  const [searchTerm, setSearchTerm] = useState("istanbul");
  const [selected, setSelected] = useState();
  const [data, setData] = useState([]);

  const router = useRouter();
  const query = useQuery({
    queryKey: ["hourlyGeoCode"],
    queryFn: getGeocodeHourly,
  });

  const handleMorePress = () => {};

  const handleLocationPress = (location: any) => {
    router.push({ pathname: "other", params: { location } });
  };

  const fetchLocations = async () => {
    await axios
      .get(`${GECODE_URL}/search?name=${searchTerm || "istanbul"}`)
      .then((response) => {    
        let newArray = response.data.results.map((item_location: Location) => {
          return {
            value: `${item_location.latitude} / ${item_location.longitude}`,
            label: `${item_location.name} - ${item_location.admin1} / ${item_location.country}`,
          };
        });
        setData(newArray);
      });
  };

  useEffect(() => {
    fetchLocations();
  }, [searchTerm]);

  const geocodeItem: ListRenderItem<GeocodeHourlyResponse> = ({ item }) => {
    let dateStr = item.hourly.time[0];
    let timezone = item.timezone.split("/")[1];
    timezone = timezone.replace(/_/g, " ");
    let date = new Date(dateStr);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return (
      <View style={[styles.weatherBox, styles.shadowProp]}>
        <View style={styles.info}>
          <Text style={styles.infoText}>{`${hours}:${formattedMinutes}`}</Text>
          <Text
            style={styles.infoText}
          >{`${item.daily?.temperature_2m_min[0]}°C - ${item.daily?.temperature_2m_max[0]}°C`}</Text>
        </View>
        <Text style={styles.cityTitle}>{timezone}</Text>

        <WeatherIcon
          customStyle={styles.giantInfoIcon}
          code={item.daily?.weather_code[0]}
        />
        <Text style={styles.giantInfoText}>
          {item.hourly.temperature_2m[0]}°C
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Today</Text>
        <TouchableOpacity style={styles.moreButton} onPress={handleMorePress}>
          <Ionicons name="ellipsis-horizontal" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Dropdown
          options={data}
          onValueChange={(value: SetStateAction<undefined>) =>
            handleLocationPress(value)
          }
          selectedValue={selected}
          placeholder="Select location"
          dropdownIcon={<Ionicons name="flag" size={24} color="gray" />}
          listHeaderComponent={
            <TextInput
              placeholder="Search Location"
              style={styles.input}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
          }
        />
      </View>
      <FlatList
        data={query.data}
        keyExtractor={(item) => item.timezone}
        renderItem={geocodeItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    paddingHorizontal: 20,
    borderColor: "gray",
  },
  headerTitle: {
    fontSize: 50,
    fontWeight: "bold",
    flex: 1,
    marginLeft: 20,
    color: "#3C4FFF",
  },
  moreButton: {
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "gray",
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
  },
  weatherBox: {
    flexDirection: "column",
    padding: 20,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "white",
    marginHorizontal: 20,
    marginVertical: 10,
    gap: 10,
    borderRadius: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  infoText: {
    color: "#9B9B9B",
  },
  cityTitle: {
    fontSize: 25,
    flex: 1,
    color: "black",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    margin: 10,
  },
  giantInfoText: {
    position: "absolute",
    bottom: 2,
    right: 7,
    fontSize: 40,
    fontWeight: "bold",
  },
  giantInfoIcon: {
    position: "absolute",
    bottom: 0,
    right: 150,
  },
});

export default Page;
