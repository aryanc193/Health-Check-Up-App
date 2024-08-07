import {
  FlatList,
  Text,
  View,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { getHighestRatedDoctors } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";
import CityDropdown from "../../components/CityDropdown";
import SpecialtyDropdown from "../../components/SpecialtyDropdown";
import { useRouter } from "expo-router";
import TipsGrid from "../../constants/healthTips";

const Home = () => {
  const { user } = useGlobalContext();
  const [doctors, setDoctors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [highestRatedDoctors, setHighestRatedDoctors] = useState([]);
  const router = useRouter();

  const fetchHighestRatedDoctors = async () => {
    try {
      const doctors = await getHighestRatedDoctors();
      setHighestRatedDoctors(doctors);
    } catch (error) {
      console.error("Error fetching highest-rated doctors:", error);
    }
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const ratedDoctors = await getHighestRatedDoctors();
      setHighestRatedDoctors(ratedDoctors);
    };

    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    if (!selectedCity || !selectedSpecialty) {
      return Alert.alert(
        "Missing Information",
        "Please select both city and specialty to search."
      );
    }
    router.push(`/search?city=${selectedCity}&specialty=${selectedSpecialty}`);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchHighestRatedDoctors();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row -mb-14">
              <View>
                <Text className="font-pmedium text-sm text-gray-700">
                  Welcome Back,
                </Text>
                <Text className="text-2xl font-psemibold text-black">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-[50px] -top-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="flex-row">
              <View className="w-[40%]">
                <CityDropdown
                  selectedCity={selectedCity}
                  onCitySelect={setSelectedCity}
                />
              </View>
              <View className="w-[60%]">
                <SpecialtyDropdown
                  selectedSpecialty={selectedSpecialty}
                  onSpecialtySelect={setSelectedSpecialty}
                />
              </View>
            </View>
            <CustomButton
              title="Search"
              handlePress={handleSearch}
              containerStyles="mt-2 w-[100%] mb-8"
              textStyles="text-white"
            />
            <Text className="font-pbold text-lg text-black -mb-6">
              Find the Highest Rated Doctors
            </Text>
            <FlatList
              data={highestRatedDoctors}
              horizontal
              keyExtractor={(item) => item.$id}
              renderItem={({ item }) => (
                <View className="p-4 mr-4 flex-row bg-gray-50 shadow-xl shadow-black rounded-md mb-14 ml-1 mt-5">
                  <Image
                    source={{ uri: item.thumbnail }}
                    className="rounded-full w-[50px] h-[50px] mr-1"
                  />
                  <View className="flex-col">
                    <Text className="font-pbold text-lg text-black">
                      {item.name}
                    </Text>
                    <Text className="font-pregular text-sm text-gray-600">
                      {item.specialty}
                    </Text>
                    <Text className="font-pregular text-sm text-gray-600">
                      {item.city}
                    </Text>
                    <Text className="font-pregular text-sm text-gray-600">
                      {item.rating} / 5 ⭐
                    </Text>
                  </View>
                </View>
              )}
            />
            <Text className="font-pbold text-lg text-black text-center">
              Health Tips
            </Text>
            <TipsGrid />
          </View>
        )}
        renderItem={({ item }) => (
          <View className="p-4 border-b border-gray-200">
            <Text className="font-pbold text-lg text-black">{item.name}</Text>
            <Text className="font-pregular text-sm text-gray-600">
              {item.specialty}
            </Text>
            <Text className="font-pregular text-sm text-gray-600">
              {item.selectedCity}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
