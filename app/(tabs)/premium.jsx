import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { icons } from "../../constants";

const Premium = () => {
  return (
    <View className="flex-1 bg-blue-600 p-6">
      <View className="bg-white rounded-lg p-6 mb-6 mt-28 shadow-2xl shadow-white">
        <Text className="text-3xl font-bold mb-4 text-center text-blue-600">
          Premium Membership
        </Text>
        <Text className="text-lg text-gray-700 mb-2">
          Unlock exclusive benefits and features with our Premium Membership!
          Here’s what you get:
        </Text>
        <View className="mt-4">
          <View className="flex-row items-center mb-4">
            <Image source={icons.checkmark} className="w-6 h-6 mr-3" />
            <Text className="text-lg text-gray-800">
              Priority while booking appointments
            </Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Image source={icons.checkmark} className="w-6 h-6 mr-3" />
            <Text className="text-lg text-gray-800">Special offers</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Image source={icons.checkmark} className="w-6 h-6 mr-3" />
            <Text className="text-lg text-gray-800">Ad-Free Experience</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Image source={icons.checkmark} className="w-6 h-6 mr-3" />
            <Text className="text-lg text-gray-800">
              Faster Delivery for medicines
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-blue-600 p-4 rounded-full mt-6">
          <Text className="text-white text-center text-lg font-semibold">
            Buy Premium
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Premium;
