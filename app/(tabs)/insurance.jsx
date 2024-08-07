import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { icons } from "../../constants";

const Insurance = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView contentContainerStyle="p-6">
        <View className="mb-8 mt-8 p-2">
          <Text className="text-3xl font-bold text-center text-blue-500 mb-4 mt-10">
            Insurance
          </Text>
          <Text className="text-lg text-gray-700 text-center">
            Get access to all your Health insurance services - View Policy,
            Initiate and Track Claims, Go Cashless with network hospitals and
            intimate Hospitalization
          </Text>
        </View>

        <View className="mb-8 flex flex-row flex-wrap justify-between">
          <View className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-xl mb-6">
            <TouchableOpacity>
              <View className="flex flex-col items-center">
                <Image source={icons.eCardIcon} className="w-16 h-16 mb-4" />
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  E-Card
                </Text>
                <Text className="text-gray-600 text-center">
                  Get e-cards for you and your family members
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-xl mb-6">
            <TouchableOpacity>
              <View className="flex flex-col items-center">
                <Image source={icons.claimsIcon} className="w-16 h-16 mb-4" />
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Claims
                </Text>
                <Text className="text-gray-600 text-center">
                  Track your claims in real-time
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-xl mb-6">
            <TouchableOpacity>
              <View className="flex flex-col items-center">
                <Image
                  source={icons.networkHospitalsIcon}
                  className="w-20 h-16 mb-4"
                />
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Network Hospitals
                </Text>
                <Text className="text-gray-600 text-center">
                  Search for the nearest Network hospital to go cashless
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="w-full md:w-5/12 bg-white p-4 rounded-lg shadow-xl mb-6">
            <TouchableOpacity>
              <View className="flex flex-col items-center">
                <Image
                  source={icons.empanelHospitalsIcon}
                  className="w-16 h-16 mb-4"
                />
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Empanel Hospitals
                </Text>
                <Text className="text-gray-600 text-center">
                  Become a part of Network Hospitals
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Insurance;
