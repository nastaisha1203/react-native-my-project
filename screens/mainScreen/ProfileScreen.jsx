import React, { useEffect, useState } from "react";
import { collection, where, getDocs, query } from "firebase/firestore";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { db, storage, firestore } from "../../firebase/config";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);
  const [userPosts, setUserPosts] = useState([]);
  const signOut = () => {
    dispatch(authSignOutUser());
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(firestore, "posts"), where("userId", "==", userId))
      );
      if (querySnapshot.empty) {
        console.log("No user posts found");
        return;
      }
      const posts = querySnapshot.docs.map((doc) => doc.data());
      setUserPosts(posts);
    } catch (error) {
      console.error("Error fetching user posts: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <TouchableOpacity style={styles.btnPress} onPress={signOut}>
          <Text style={{ color: `#fff` }}>Log out</Text>
        </TouchableOpacity>
        {userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
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
                <Text>{item.comment}</Text>
              </View>
            )}
          />
        ) : (
          <Text>No posts found</Text>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  btnPress: {
    marginTop: 60,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "#FF6C00",
    width: 200,
    color: "#ffffff",
    height: 40,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ProfileScreen;
