import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Fontisto } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
    return;
  }, [route.params]);

  const goToMap = (latitude, longitude) =>
    navigation.navigate("Map", {
      latitude: latitude,
      longitude: longitude,
    });

  const goToComments = (photo) =>
    navigation.navigate("Comments", { photo: photo });
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

      {posts.length !== 0 && (
        <FlatList
          data={posts}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.photo.photo !== "" && item.photo.photo ? (
                <Image
                  style={styles.image}
                  source={{ uri: item.photo.photo }}
                />
              ) : (
                <View
                  style={{ ...styles.image, backgroundColor: "#BDBDBD" }}
                ></View>
              )}
              <Text style={styles.description}>Description</Text>
              <View style={styles.btnWrapper}>
                <Pressable
                  style={styles.button}
                  onPress={() => goToComments(item.photo.photo)}
                >
                  <Fontisto name="comment" size={24} color="#BDBDBD" />
                  <Text style={styles.commentText}>15</Text>
                </Pressable>
                <Pressable
                  style={styles.button}
                  onPress={() =>
                    goToMap(item.photo.latitude, item.photo.longitude)
                  }
                >
                  <SimpleLineIcons
                    name="location-pin"
                    size={24}
                    color="#BDBDBD"
                    style={styles.icon}
                  />
                  <Text style={styles.locationText}>Location description</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DefaultScreenPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
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
  card: {
    marginBottom: 32,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  description: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  btnWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    display: "flex",
    flexDirection: "row",
  },
  icon: { marginRight: 8 },

  commentText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginLeft: 8,
  },
  locationText: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
    color: "#212121",
    marginLeft: 8,
  },
});
