import {
  StyleSheet,
  Image,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect } from "react";
import {
  MaterialIcons,
  SimpleLineIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { useSelector } from "react-redux";

import { storage, firestore } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

const initialState = {
  photo: null,
  comments: 0,
  description: "",
  placeName: "",
  latitude: "",
  longitude: "",
  id: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [keyboardStatus, setKeyboardStatus] = useState("");
  const [camera, setCamera] = useState(null);
  const [state, setState] = useState(initialState);
  const [isDisabled, setDisabled] = useState(true);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { userId, nickName } = useSelector((state) => state.auth);
  const { name, photo, description, placeName } = state;

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (
      state.photo !== "" &&
      state.description !== "" &&
      state.placeName !== ""
    ) {
      setDisabled(false);
    }
  }, [state]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let locationRes = await Location.getCurrentPositionAsync({});
      setLocation(locationRes);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setState((prevState) => ({
      ...prevState,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    }));
    setState((prevState) => ({ ...prevState, photo: photo.uri }));
  };

  const sendPhoto = () => {
    uploadPostToServer();
    navigation.navigate("DefaultScreenPosts", { photo: state });
    // setCamera(null);
    setState(initialState);
    setDisabled(true);
  };

  const uploadPostToServer = async () => {
    const uploadPhoto = await uploadPhotoToServer();
    const uploadObj = {
      photo: uploadPhoto,
      comments: 0,
      location: location.coords,
      userId,
      nickName,
      description: description,
      placeName: placeName,
      // latitude: "",
      // longitude: "",
    };
    const dbRef = collection(firestore, "posts");
    const dbPost = await addDoc(dbRef, uploadObj);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniqePostId = Date.now().toString();
    const data = ref(storage, `postImage/${uniqePostId}`);
    await uploadBytes(data, file);

    const processPhoto = await getDownloadURL(data);
    return processPhoto;
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : ""}
      keyboardVerticalOffset={0}
    >
      <View
        style={{
          ...styles.container,
          paddingTop: keyboardStatus ? 0 : 32,
        }}
      >
        {photo ? (
          <View style={styles.cameraCoverWrapper}>
            <Image source={{ uri: photo }} style={styles.cameraCover} />
            <Pressable
              style={styles.circle}
              onPress={(prevState) => setState({ ...prevState, photo: null })}
            >
              <FontAwesome name="repeat" size={24} color="#FFF" />
            </Pressable>
          </View>
        ) : (
          <Camera
            style={styles.camera}
            ref={(ref) => {
              setCamera(ref);
            }}
          >
            {photo && (
              <View style={styles.previewWrapper}>
                <Image source={{ uri: photo }} style={styles.previewPhoto} />
              </View>
            )}
            <Pressable style={styles.circle} onPress={takePhoto}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                color="#fff"
                style={styles.cameraIcon}
              />
            </Pressable>
          </Camera>
        )}
        {photo ? (
          <Text
            style={{
              ...styles.downoladText,
              marginBottom: keyboardStatus ? 18 : 32,
            }}
          >
            Редактировать фото
          </Text>
        ) : (
          <Text
            style={{
              ...styles.downoladText,
              marginBottom: keyboardStatus ? 18 : 32,
            }}
          >
            Загрузите фото
          </Text>
        )}

        <View
          style={{
            ...styles.locationSection,
            marginBottom: keyboardStatus ? 16 : 32,
          }}
        >
          <MaterialIcons
            name="edit"
            size={24}
            color="#BDBDBD"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputLocation}
            mode="outlined"
            placeholder="Название..."
            value={state.description}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                description: value,
              }))
            }
          />
        </View>

        <View
          style={{
            ...styles.locationSection,
            marginBottom: keyboardStatus ? 10 : 32,
          }}
        >
          <SimpleLineIcons
            name="location-pin"
            size={24}
            color="#BDBDBD"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.inputLocation}
            mode="outlined"
            placeholder="Местность..."
            value={state.placeName}
            onChangeText={(value) =>
              setState((prevState) => ({
                ...prevState,
                placeName: value,
              }))
            }
          />
        </View>
        <View style={styles.buttonsWrapper}>
          <Pressable
            style={({ pressed }) => [
              styles.publicationBtn,
              { opacity: pressed ? 0.8 : 1 },
              {
                backgroundColor: isDisabled ? "#E8E8E8" : "#FF6C00",
              },
            ]}
            onPress={() => sendPhoto()}
            disabled={isDisabled}
          >
            <Text
              style={[
                { color: isDisabled ? "#BDBDBD" : "#ffffff" },
                styles.publicationBtnText,
              ]}
            >
              Опубликовать
            </Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "#FF6C0099" : "#FF6C00",
              },
              styles.removeBtn,
            ]}
          >
            <FontAwesome5 name="trash-alt" size={24} color="#BDBDBD" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    borderWidth: 1,
    borderColor: "red",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  camera: {
    width: "100%",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "flex-end",
    height: 240,
  },
  circle: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: [{ translateX: -30 }],
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF22",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cameraIcon: {
    color: "#FFFFFF",
    opacity: 1,
  },

  flipBtn: {
    position: "absolute",
    bottom: 0,
    left: 16,
    width: 60,
    height: 60,
    backgroundColor: "#FFFFFF22",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  previewWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    borderColor: "#BDBDBD",
    borderWidth: 1,
  },

  previewPhoto: {
    width: 50,
    height: 50,
  },
  downoladText: {
    alignSelf: "flex-start",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },

  cameraCoverWrapper: {
    width: "100%",
    height: 240,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    height: 240,
  },
  cameraCover: {
    flex: 1,
    justifyContent: "center",
  },

  locationSection: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
    paddingHorizontal: 16,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },

  inputIcon: {
    color: "#BDBDBD",
    marginRight: 8,
  },

  inputLocation: {
    width: "100%",
    fontSize: 16,
    color: "#212121",
  },

  absoluteFill: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
  },

  buttonsWrapper: {
    flex: 1,
    flexDirection: "column",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  publicationBtn: {
    borderRadius: 100,
    padding: 16,
    width: "100%",
  },

  publicationBtnText: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
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
