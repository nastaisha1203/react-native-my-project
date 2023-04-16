import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";

const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await onSnapshot(collection(firestore, "posts"), (data) =>
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      )
    );
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={require("../../assets/images/avatarca.jpg")}
        />
        <View>
          <Text style={styles.userName}>Natali Romanova</Text>
          <Text style={styles.userEmail}>email@example.com</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 8,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: item.photo }}
              style={{
                width: 350,
                height: 250,
                borderRadius: 10,
              }}
            />
            <View>
              <Text>{item.comment}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={styles.btnPress}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.location,
                  })
                }
              >
                <Text style={{ color: `#fff`, margin: 8 }}>Map</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnPress}
                onPress={() =>
                  navigation.navigate("Comments", {
                    postId: item.id,
                  })
                }
              >
                <Text style={{ color: `#fff`, margin: 8 }}>Comments</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    justifyContent: "center",
  },
  user: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 32,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userName: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    color: "#212121",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  btnPress: {
    marginHorizontal: 80,
    marginTop: 20,
    backgroundColor: `#FF6C00`,
    minWidth: 80,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DefaultScreen;
