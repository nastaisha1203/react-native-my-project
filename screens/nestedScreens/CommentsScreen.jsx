import {
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  View,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

const initialComments = [
  {
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores consectetur saepe voluptatibus. Corporis qui quaerat itaque enim saepe, perspiciatis error quae autem velit adipisci magnam, ex magni sit veritatis repellendus!",
    date: "09 июня, 2020 | 08:40",
  },
  {
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores consectetur saepe voluptatibus.",
    date: "09 июня, 2020 | 09:14",
  },
  {
    comment: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    date: "09 июня, 2020 | 09:20",
  },
];

const CommentsScreen = ({ route }) => {
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  useEffect(() => {
    if (route.params) {
      setPhoto(route.params.photo);
      console.log("set params:", route.params.photo);
    }
    return;
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View>
        {photo && <Image style={styles.image} source={{ uri: photo }} />}
      </View>

      <FlatList
        data={comments}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.avatar} />
            <View style={styles.textWrapper}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.commentInput}
          placeholder="Comment..."
          value={newComment}
          onChangeText={(value) => setNewComment(value)}
          mode="outlined"
        />

        <Pressable style={styles.commentBtn}>
          <AntDesign name="arrowup" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  card: {
    backgroundColor: "#FF6C00",
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    resizeMode: "cover",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  textWrapper: {
    padding: 16,
    flex: 1,
    backgroundColor: "#F6F6F6",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
  },
  commentText: {
    fontWeight: 400,
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  date: {
    fontWeight: 400,
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "#BDBDBD",
  },
  image: {
    resizeMode: "cover",
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 8,
    marginBottom: 8,
  },
  commentInput: {
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    height: 50,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
  },
  commentBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    position: "relative",
    marginBottom: 16,
  },
});
