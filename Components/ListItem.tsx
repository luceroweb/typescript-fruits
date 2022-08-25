import React, { FC, useState } from "react";
import { FruitType } from "../Utils/fruitsData";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const Item: FC<FruitType> = (props) => {
  return (
    <View style={styles.container}>
      <FontAwesome
        name={props.starred ? "star" : "star-o"}
        size={22}
        color="#555"
      />
      <Text style={[styles.item, { flexGrow: 1 }]}>{props.name}</Text>
      <Text style={styles.item}>{props.price}</Text>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#AAA",
    padding: 10,
  },
  item: {
    padding: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
});
