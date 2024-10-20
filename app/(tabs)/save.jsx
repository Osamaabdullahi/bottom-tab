import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Save = () => {
  return (
    <View style={styles.container}>
      <Text>Save</Text>
    </View>
  );
};

export default Save;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    paddingHorizontal: 15,
  },
});
