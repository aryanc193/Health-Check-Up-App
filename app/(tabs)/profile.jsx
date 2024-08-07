import { useState, useEffect } from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
  Alert,
  ActivityIndicator,
  Linking,
} from "react-native";
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import {
  getUserVisitedDoctors,
  signOut,
  cancelAppointment,
} from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const {
    data: visitedDoctors,
    loading,
    refetch,
  } = useAppwrite(() => getUserVisitedDoctors(user.$id));
  const [refreshing, setRefreshing] = useState(false);

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

  const handleCancel = async (appointmentId) => {
    try {
      await cancelAppointment(appointmentId);
      Alert.alert(
        "Appointment Cancelled",
        "Your appointment has been cancelled successfully."
      );
      refetch(); // Refresh the data after cancelling the appointment
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      Alert.alert("Error", "Failed to cancel appointment. Please try again.");
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const logout = async () => {
    try {
      await signOut(); // Ensure this clears the session properly
      setUser(null); // Clear user state
      setIsLogged(false); // Update global login state
      console.log("Logging out and redirecting...");
      router.replace("/sign-in"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert(
        "Logout Failed",
        "There was an issue logging out. Please try again."
      );
    }
  };

  if (loading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );

  return (
    <SafeAreaView className="bg-white h-full">
      <FlatList
        data={visitedDoctors}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View className="p-8 mb-4">
            <View className="bg-gray-50 p-4 rounded-lg shadow-2xl shadow-blue-500 border-gray-300 border">
              <Text className="text-lg font-semibold text-secondary">
                {item.name}
              </Text>
              <Text className="text-gray-800 mt-2 text-lg">
                {item.specialty}
              </Text>
              <Text className="text-gray-800 mt-2 text-lg pb-5">
                Date: {formatDateTime(item.appointmentDate)}
              </Text>
              <Text className="text-gray-900 mt-2 text-lg font-semibold">
                Contact:
              </Text>
              <Text
                className="text-gray-800 mt-2 text-lg"
                onPress={() => Linking.openURL(`tel:${item.phone}`)}
              >
                {item.phone}
              </Text>
              <Text
                className="text-gray-800 mt-2 text-lg"
                onPress={() => Linking.openURL(`mailto:${item.email}`)}
              >
                {item.email}
              </Text>

              <TouchableOpacity
                className="bg-blue-100 rounded-xl min-h-[62px] justify-center items-center mt-5"
                onPress={() => handleCancel(item.appointmentId)}
              >
                <Text className="text-primary font-psemibold text-lg">
                  Cancel Appointment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={() => (
          <EmptyState
            title="No Doctors visited yet :("
            subtitle="Visit a doctor and let us know your experience!"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              subtitle={user?.email}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <Text className="text-gray-600 font-light text-lg mt-14 -mb-20 text-left w-full">
              Doctors you have visited before:
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
