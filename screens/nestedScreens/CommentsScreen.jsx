import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase/config";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { collection, setDoc, doc, onSnapshot } from "firebase/firestore";

const CommentsScreen = ({ route }) => {
  const { postId } = route.params;
  const [comment, setComment] = useState("");
  const [allComment, setAllComment] = useState([]);
  const [loading, setLoading] = useState(true);

  const { nickName } = useSelector((state) => state.auth);

  const createPost = async () => {
    try {
      const postRef = doc(
        collection(firestore, "comments", postId, "posts"),
        postId
      );
      await setDoc(postRef, {
        comment,
        nickName,
      });
      setComment("");
      console.log("Post created successfuly", comment);
    } catch (error) {
      console.log("error creating post:", error);
    }
  };
  const getAllPosts = async () => {
    onSnapshot(collection(firestore, "comments", postId, "posts"), (data) => {
      const allPosts = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setAllComment((prev) => [...prev, ...allPosts]);
      setLoading(false);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allComment}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.commentContainer}>
            <Text>{item.nickName}</Text>
            <Text>{item.comment}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item.id + index}
      />

      <View style={styles.inputContainer}>
        <TextInput
          type={"input"}
          placeholder={"Comment..."}
          style={styles.input}
          onChangeText={setComment}
        ></TextInput>
      </View>
      <TouchableOpacity onPress={createPost} style={styles.sendBtn}>
        <Text style={styles.sendTitle}>Add post</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  commentContainer: {
    backgroundColor: "#e1dfe2",
    borderRadius: 20,
    marginHorizontal: 20,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  sendBtn: {
    marginHorizontal: 80,
    height: 40,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: `#FF6C00`,
  },
  sendTitle: {
    color: "#FFFFFF",
    fontSize: 20,
  },
  inputContainer: {
    position: "relative",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    height: 50,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
});
export default CommentsScreen;
