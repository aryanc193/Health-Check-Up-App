import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

const healthTips = [
  { id: "1", tip: "Stay hydrated" },
  { id: "2", tip: "Exercise regularly" },
  { id: "3", tip: "Eat balanced meals" },
  { id: "4", tip: "Get enough sleep" },
  { id: "5", tip: "Take breaks" },
  { id: "6", tip: "Stay positive" },
  // Add more tips as needed
];

const backgroundColors = [
  "#FFD700",
  "#FF6347",
  "#32CD32",
  "#C484ff",
  "#FF69B4",
  "#ffad3a",
  // Add more colors if needed
];

const TipCard = ({ tip, backgroundColor }) => (
  <View style={[styles.tipCard, { backgroundColor }]}>
    <Text style={styles.tipText}>{tip}</Text>
  </View>
);

const TipsGrid = () => {
  // Ensure each tip has a unique color
  const tipsWithColors = healthTips.map((tip, index) => ({
    ...tip,
    backgroundColor: backgroundColors[index % backgroundColors.length],
  }));

  return (
    <FlatList
      data={tipsWithColors}
      keyExtractor={(item) => item.id}
      numColumns={2} // Adjust the number of columns as needed
      renderItem={({ item }) => (
        <TipCard tip={item.tip} backgroundColor={item.backgroundColor} />
      )}
      contentContainerStyle={styles.grid}
    />
  );
};

const styles = StyleSheet.create({
  grid: {
    padding: 10,
  },
  tipCard: {
    flex: 1,
    margin: 5,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tipText: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
  },
});

export default TipsGrid;
