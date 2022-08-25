import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { FruitType, FruitsArray } from "./Utils/fruitsData";
import Input from "./Components/Input";
import AddFruit from "./Components/AddFruit";
import Item from "./Components/ListItem";
import StarredList from "./Components/StarredList";

export default function App() {
  const [tab, setTab] = useState<string>("list");
  const [fruitsState, setFruitsState] = useState<FruitType[]>([]);

  useEffect(() => {
    setFruitsState(
      FruitsArray.sort((a: FruitType, b: FruitType) => {
        return a.price > b.price ? 1 : b.price > a.price ? -1 : 0;
      })
    );
  }, []);

  const handleSearch = (text: string) => {
    const searchResults: FruitType[] = FruitsArray.filter((fruit) =>
      fruit.name.toLowerCase().includes(text.toLocaleLowerCase())
    );
    setFruitsState(searchResults);
  };

  const starItem = (item: FruitType) => {
    const itemIndex = fruitsState.indexOf(item);
    item.starred = !item.starred;
    if (itemIndex > -1) {
      fruitsState.splice(itemIndex, 1, item);
    }
    setFruitsState([...fruitsState]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setTab("list")}>
          <Text style={tab !== "list" ? styles.tab : styles.tabSelected}>
            List
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("starred")}>
          <Text style={tab !== "starred" ? styles.tab : styles.tabSelected}>
            Starred
          </Text>
        </TouchableOpacity>
      </View>
      {tab === "list" && (
        <>
          <View style={styles.search}>
            <Input
              icon="search"
              placeholder="Search"
              onChangeText={(text) => handleSearch(text)}
            />
          </View>
          <View style={styles.fruitList}>
            <FlatList
              data={fruitsState}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => starItem(item)}>
                  <Item
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    starred={item.starred}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={styles.addFruits}>
            <AddFruit
              fruitsState={fruitsState}
              setFruitsState={setFruitsState}
            />
          </View>
        </>
      )}
      {tab === "starred" && (
        <View style={styles.fruitList}>
          <StarredList fruitsState={fruitsState} starItem={starItem} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    margin: 10,
    marginTop: StatusBar.currentHeight,
  },
  search: {
    flexShrink: 1,
    paddingBottom: 20,
  },
  fruitList: {
    flexShrink: 1,
    paddingBottom: 10,
  },
  addFruits: {
    flexGrow: 1,
  },
  tabContainer: {
    flexDirection: "row",
    borderBottomColor: "blue",
    borderBottomWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
  },
  tabSelected: {
    backgroundColor: "blue",
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    color: "white",
    fontWeight: "bold",
  },
  tab: {
    backgroundColor: "#555",
    padding: 10,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    color: "white",
    fontWeight: "bold",
  },
});
