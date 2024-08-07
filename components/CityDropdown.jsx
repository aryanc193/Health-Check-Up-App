import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { getUniqueCities } from "../lib/appwrite";
import { icons } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const CityDropdown = ({ onCitySelect, selectedCity }) => {
  const { user } = useGlobalContext();
  const [cities, setCities] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchCities = async () => {
      const cityList = await getUniqueCities();
      setCities(cityList);
    };

    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    onCitySelect(city); // Pass the selected city to the parent component
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <View className="flex-row">
          <Image source={icons.pin} className="w-[20px] h-[20px]" />
          <Text style={styles.text}>{selectedCity || "Select City"}</Text>
        </View>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={cities}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleCitySelect(item)}
              >
                <Text style={styles.text}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative", // Ensure the container is positioned relative
    margin: 2,
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#c9c9c9",
    borderRadius: 5,
    backgroundColor: "#fff",
    zIndex: 5, // Ensure it appears above other elements
  },
  dropdownContainer: {
    position: "absolute", // Position the dropdown absolutely
    top: "100%", // Position the dropdown just below the button
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#c9c9c9",
    borderRadius: 5,
    zIndex: 10, // Ensure it appears above other elements
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e9e9e9",
  },
  text: {
    fontSize: 16,
  },
});

export default CityDropdown;
