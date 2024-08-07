import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { icons } from "../../constants";

const Medicine = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleCategory = (index) => {
    setExpandedCategory(expandedCategory === index ? null : index);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="p-6">
        <View className="mb-8">
          <Text className="text-3xl font-bold text-center text-blue-500 mb-4 mt-10">
            Medicine Information
          </Text>
          <Text className="text-lg text-gray-700 text-center">
            Explore different categories and featured medicines. Get detailed
            information on dosage, side effects, and precautions.
          </Text>
        </View>

        <View className="mb-8">
          <Text className="text-2xl font-semibold text-gray-800 mb-4">
            Medicine Categories
          </Text>
          {medicineCategories.map((category, index) => (
            <View key={index} className="mb-4">
              <TouchableOpacity
                onPress={() => toggleCategory(index)}
                className="bg-white p-4 rounded-lg shadow-xl flex-row justify-between shadow-black"
              >
                <Text className="text-lg font-semibold text-gray-800">
                  {category.name}
                </Text>
                <Image source={icons.plus} className="w-[20px] h-[20px]" />
              </TouchableOpacity>
              {expandedCategory === index && (
                <View className="bg-gray-100 p-4 rounded-lg mt-2">
                  {category.medicines.map((medicine, medIndex) => (
                    <View key={medIndex} className="mb-2">
                      <Text className="text-lg font-semibold text-gray-800">
                        {medicine.name}
                      </Text>
                      <Text className="text-gray-600">
                        {medicine.description}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity className="bg-blue-600 p-4 rounded-full -mt-6 mb-12">
          <Text className="text-white text-center text-lg font-semibold">
            Get More Information
          </Text>
        </TouchableOpacity>
        <View className="bg-white p-6 rounded-lg shadow-md mb-8">
          <Text className="text-xl font-semibold text-gray-800 mb-4">
            Install Our Medicine Ordering App
          </Text>
          <Text className="text-lg text-gray-700 mb-4">
            For a convenient way to order and track your medicines, check out
            our dedicated app. It offers easy ordering, real-time tracking, and
            more features to ensure you never run out of your essential
            medications.
          </Text>
          <TouchableOpacity className="bg-blue-600 p-4 rounded-full">
            <Text className="text-white text-center text-lg font-semibold">
              Download Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const medicineCategories = [
  {
    name: "Pain Relief",
    medicines: [
      {
        name: "Acetaminophen",
        description: "Used for pain relief and reducing fever.",
      },
      {
        name: "Ibuprofen",
        description: "Relieves pain, reduces inflammation, and lowers fever.",
      },
    ],
  },
  {
    name: "Cold & Flu",
    medicines: [
      {
        name: "Diphenhydramine",
        description: "An antihistamine used for allergy relief.",
      },
      {
        name: "Phenylephrine",
        description: "Relieves nasal congestion and sinus pressure.",
      },
    ],
  },
  {
    name: "Digestive Health",
    medicines: [
      {
        name: "Probiotics",
        description: "Supports digestive health and balance.",
      },
      { name: "Loperamide", description: "Used to treat diarrhea." },
    ],
  },
  {
    name: "Vitamins & Supplements",
    medicines: [
      {
        name: "Multivitamins",
        description: "Provides essential vitamins and minerals.",
      },
      { name: "Omega-3", description: "Supports heart and brain health." },
    ],
  },
  {
    name: "Allergy Relief",
    medicines: [
      {
        name: "Loratadine",
        description: "An antihistamine used for allergy symptoms.",
      },
      {
        name: "Nasal Steroid Spray",
        description: "Reduces inflammation and congestion.",
      },
    ],
  },
];

export default Medicine;
