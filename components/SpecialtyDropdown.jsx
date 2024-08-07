import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { getUniqueSpecialties } from "../lib/appwrite";
import { useGlobalContext } from "../context/GlobalProvider";

const SpecialtyDropdown = ({ onSpecialtySelect, selectedSpecialty }) => {
  const { user } = useGlobalContext();
  const [specialties, setSpecialties] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const fetchSpecialties = async () => {
      const specialtyList = await getUniqueSpecialties();
      setSpecialties(specialtyList);
    };

    fetchSpecialties();
  }, []);

  const handleSpecialtySelect = (specialty) => {
    onSpecialtySelect(specialty); // Pass the selected specialty to the parent component
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.text}>
          {selectedSpecialty || "Select Specialty"}
        </Text>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={specialties}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSpecialtySelect(item)}
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
    position: "relative",
    margin: 2,
  },
  dropdown: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#c9c9c9",
    borderRadius: 5,
    backgroundColor: "white",
    zIndex: 5, // Ensure it appears above other elements
  },
  dropdownContainer: {
    position: "absolute", // Position the dropdown absolutely
    top: "100%", // Position the dropdown just below the button
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#c9c9c9",
    borderRadius: 5,
    zIndex: 10, // Ensure it appears above other elements
    overflow: "visible",
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

export default SpecialtyDropdown;
