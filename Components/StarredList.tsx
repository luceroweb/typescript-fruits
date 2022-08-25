import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FruitType } from "../Utils/fruitsData";
import Item from "./ListItem";

interface Props {
  fruitsState: FruitType[];
  starItem: (item: FruitType) => void;
}

const StarredList: FC<Props> = ({ fruitsState, starItem }) => {
  const starredCount = fruitsState.filter((fruit) => fruit.starred === true);
  return (
    <View style={styles.starredList}>
      {starredCount.length === 0 && <Text>No Starred Fruits</Text>}
      <FlatList
        data={fruitsState}
        renderItem={({ item }) => (
          <>
            {item.starred && (
              <TouchableOpacity onPress={() => starItem(item)}>
                <Item
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  starred={item.starred}
                />
              </TouchableOpacity>
            )}
          </>
        )}
      />
    </View>
  );
};

export default StarredList;

const styles = StyleSheet.create({
  starredList: {
    flex: 1,
    width: "100%",
  },
});
