import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { icons } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";

const Yearly = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handlePress = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <SafeAreaView className="flex-1 bg-green-100">
      <ScrollView className="flex-grow w-full p-6">
        <View className="w-full mb-6 mt-15">
          <Text className="text-3xl font-bold mb-4 text-center text-green-600">
            Annual Health Check-Up
          </Text>
          <Text className="text-lg text-gray-700 mb-2">
            Stay on top of your health with our comprehensive annual check-up
            plan. Here’s what’s included:
          </Text>
          <View className="mt-4">
            {checkupItems.map((item, index) => (
              <View key={index} className="flex-row items-center mb-4">
                <Image source={icons.checkmark} className="w-6 h-6 mr-3" />
                <Text className="text-lg text-gray-800">{item}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity className="bg-green-600 p-4 rounded-full mt-6">
            <Text className="text-white text-center text-lg font-semibold">
              Schedule Your Check-Up
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full bg-white p-6 rounded-lg shadow-lg mt-6 mb-12">
          <Text className="text-2xl font-bold mb-4 text-green-600 text-center">
            Why Consistent Health Checks Are Important
          </Text>
          {reasons.map((reason, index) => (
            <View key={index} className="mb-4">
              <TouchableOpacity onPress={() => handlePress(index)}>
                <Text className="text-lg font-semibold text-gray-800 mb-1">
                  {index + 1}. {reason.title}...
                </Text>
              </TouchableOpacity>
              {expandedIndex === index && (
                <Text className="text-lg text-gray-800">{reason.details}</Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const checkupItems = [
  "Complete Physical Examination",
  "Blood Pressure Check",
  "Blood Tests",
  "Cholesterol Screening",
  "BMI Calculation",
  "Personalized Health Report",
];

const reasons = [
  {
    title: "Early Detection",
    details:
      "Detecting health issues early can lead to more effective treatment. For example, routine screenings can identify conditions like high blood pressure and diabetes before symptoms appear.",
  },
  {
    title: "Preventive Care",
    details:
      "Regular check-ups help in preventing diseases. Studies show that individuals who get regular screenings are 30% more likely to catch issues before they become serious.",
  },
  {
    title: "Health Monitoring",
    details:
      "Monitoring your health over time helps track improvements or deteriorations in conditions like cholesterol levels and heart health.",
  },
  {
    title: "Peace of Mind",
    details:
      "Regular check-ups provide reassurance that you are on the right track with your health, reducing anxiety about potential health issues.",
  },
  {
    title: "Cost Savings",
    details:
      "Preventive care can save money in the long run by avoiding more costly treatments for advanced diseases.",
  },
];

const styles = StyleSheet.create({
  checkmark: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
});

export default Yearly;
