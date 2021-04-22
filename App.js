import React from "react";
import { View, StyleSheet } from "react-native";
import Converter from "./src/components/Converter";

export default function App() {
  return (
    <View style={styles.container}>
      <Converter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
});
