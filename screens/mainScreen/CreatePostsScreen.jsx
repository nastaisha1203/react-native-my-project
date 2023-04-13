import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TextInput, Pressable } from "react-native";

const CreatePostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <View style={styles.circle}>
          <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
        </View>
      </View>
      <Text style={styles.downoladText}>Загрузить фото</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Название..."
          placeholderColor="#BDBDBD"
        />
        <SimpleLineIcons name="location-pin" size={24} color="#BDBDBD" />
        <TextInput
          style={styles.inputLocation}
          mode="outlined"
          placeholder="Местность..."
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#FF6C0099" : "#F6F6F6",
          },
          styles.publicationBtn,
        ]}
        onPress={() => {}}
      >
        <Text style={styles.publicationBtnText}>Опубликовать</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "#FF6C0099" : "#FF6C00",
          },
          styles.removeBtn,
        ]}
        onPress={() => {}}
      >
        <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  imageBox: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  circle: {
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  downoladText: {
    // alignSelf: "flex-start",
    // fontWeight: 400,
    // fontSize: 16,
    // lineHeight: 19,
    // color: "#BDBDBD",
    // marginBottom: 98,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  form: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#ffffff",
    marginBottom: 47,
    color: "#212121",
    fontSize: 16,
  },
  inputLocation: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginBottom: 32,
  },
  publicationBtn: {
    borderRadius: 100,
    padding: 16,
    width: "100%",
    marginBottom: 120,
  },

  publicationBtnText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },
  removeBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
  },
});
