import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, Linking } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { searchDoctors } from "../../lib/appwrite";
import CustomButton from "../../components/CustomButton";

const SearchResults = () => {
  const { city, specialty } = useLocalSearchParams();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsList = await searchDoctors(city, specialty);
        setDoctors(doctorsList);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    if (city && specialty) {
      fetchDoctors();
    }
  }, [city, specialty]);

  const handleBooking = (doctorId) => {
    // Navigate to a booking page or handle booking logic
    // console.log(doctorId);
    router.push(`/booking/BookingPage?id=${doctorId}`);
  };

  return (
    <View className="flex-col p-2">
      <Text className="text-xl font-bold mt-14 ml-2 text-left">
        Doctors in {city} specializing in {specialty}
      </Text>
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="p-5 flex-col bg-white rounded-lg mt-2 ">
            <View className="flex-row">
              <View className="w-[90px] h-[90px] border-2 border-blue-500 rounded-full justify-center items-center">
                <Image
                  source={{ uri: item.thumbnail }}
                  className="w-[88px] h-[88px] rounded-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-col">
                <Text className="text-xl font-bold ml-2 mt-2">{item.name}</Text>
                <Text className="text-md font-semibold ml-2 mt-2">
                  {item.specialty}
                </Text>
                <Text className="text-md font-semibold ml-2 ">
                  {item.experience}+ years of experience
                </Text>
              </View>
            </View>
            <View>
              <Text className="text-lg font-semibold ml-2 mt-2">
                {item.city}
              </Text>
              <Text className="text-lg font-semibold ml-2 ">
                {item.address}
              </Text>
              <Text className="text-lg font-semibold ml-2 mt-2">
                Rs. {item.consultationFees} Consultation Fees
              </Text>
              <Text className="text-xl font-semibold ml-2 mt-2">
                {item.rating} / 5 ⭐
              </Text>
              <Text
                className="text-xl font-semibold ml-2 mt-2"
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              >
                Phone: {item.phone}
              </Text>
              <Text
                className="text-xl font-semibold ml-2 mt-2"
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              >
                Email: {item.email}
              </Text>
              <CustomButton
                title="Book a Visit"
                containerStyles="bg-blue-400 mt-2"
                textStyles="text-white"
                handlePress={() => handleBooking(item.$id)}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default SearchResults;
