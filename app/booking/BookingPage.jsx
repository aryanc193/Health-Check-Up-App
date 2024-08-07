import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Platform,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { getDoctorById, bookAppointment } from "../../lib/appwrite";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const BookingPage = () => {
  const { user } = useGlobalContext();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error("Failed to fetch doctor:", error);
      } finally {
        setLoading(false);
      }
    };
    // console.log(id);
    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDateChange = (event, date) => {
    if (event.type === "set") {
      const newDate = date || new Date();
      setSelectedDate((prevDate) => {
        const updatedDate = new Date(prevDate);
        updatedDate.setFullYear(newDate.getFullYear());
        updatedDate.setMonth(newDate.getMonth());
        updatedDate.setDate(newDate.getDate());
        return updatedDate;
      });
      setShowDatePicker(false);
      if (!showTimePicker) {
        setShowTimePicker(true);
      }
    } else {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event, time) => {
    if (event.type === "set") {
      const newTime = time || new Date();
      setSelectedDate((prevDate) => {
        const updatedDate = new Date(prevDate);
        updatedDate.setHours(newTime.getHours());
        updatedDate.setMinutes(newTime.getMinutes());
        return updatedDate;
      });
      setShowTimePicker(false);
    } else {
      setShowTimePicker(false);
    }
  };

  const openDatePicker = () => {
    if (Platform.OS === "ios") {
      setShowDatePicker(true);
    } else if (Platform.OS === "android") {
      import("@react-native-community/datetimepicker").then(
        ({ DateTimePickerAndroid }) => {
          DateTimePickerAndroid.open({
            mode: "date",
            value: selectedDate,
            onChange: (event, date) => handleDateChange(event, date),
          });
        }
      );
    }
  };

  const handleBookAppointment = async () => {
    try {
      if (!doctor) {
        Alert.alert("Error", "Doctor information is not available.");
        return;
      }
      await bookAppointment(user.$id, doctor.$id, selectedDate);
      Alert.alert("Success", "Appointment booked successfully!");
      router.push("../(tabs)/home");
    } catch (error) {
      Alert.alert("Error", "Failed to book appointment. Please try again.");
      console.error(error);
    }
  };

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

  if (!doctor) return <Text>Doctor not found</Text>;

  return (
    <View className="flex-1 mt-10 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
        <View className="items-center justify-center">
          <Image
            source={{ uri: doctor.thumbnail }}
            className="w-[90px] h-[90px] rounded-lg mt-3 mb-3"
          />
        </View>
        <Text className="text-4xl font-bold mb-1 text-black uppercase text-center">
          {doctor.name}
        </Text>
        <Text className="text-lg text-black mb-4 text-center">
          {doctor.specialty}
        </Text>
        <Text className="text-lg text-black mb-4">
          Book a time to consult with {doctor.name}
          {"\n"}and confirm!
        </Text>
        <CustomButton
          title="Select Date & Time"
          handlePress={openDatePicker}
          containerStyles="w-full h-12 bg-blue-500 mb-5"
          textStyles="text-white"
        />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => handleDateChange(event, date)}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="time"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, time) => handleTimeChange(event, time)}
          />
        )}
        <Text className="text-xl font-regular text-black">
          Selected Date and Time:{" "}
        </Text>
        <Text className="text-blue-500 font-bold text-3xl mt-4">
          {formatDateTime(selectedDate)}
        </Text>
        <Text className="text-2xl font-bold text-black my-4">
          Consultation Fees: Rs. {doctor.consultationFees}
        </Text>
        <Text className="text-xl font-regular text-gray-800 mt-2">
          Contact:
          {"\n"}
          {doctor.phone}
          {"\n"}
          {doctor.email}
        </Text>
        <Text className="text-xl font-regular text-gray-800 mt-6">
          Address:
          {"\n"}
          {doctor.address}
        </Text>
      </ScrollView>
      <CustomButton
        title="Book Appointment"
        handlePress={handleBookAppointment}
        containerStyles="w-full h-12 bg-blue-500"
        textStyles="text-white"
      />
    </View>
  );
};

export default BookingPage;
