import { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import image from "../../assets/images/background.jpg";

import { useDispatch } from "react-redux";

import { registerUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const windowDimensions = Dimensions.get("window").width;

export default function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const { login, email, password } = state;
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isNotShownPassword, setIsNotShownPassword] = useState(true);
  const [dimensions, setDimensions] = useState(windowDimensions);

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const handleSubmit = () => {
    keyboardHide();
    dispatch(registerUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, width: dimensions }}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : ""}
            keyboardVerticalOffset={0}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 0 : 66,
              }}
            >
              <View style={styles.userImage}>
                <View style={styles.imgWrapper}>
                  <Image
                    style={styles.img}
                    source={require("../../assets/images/avatarca.jpg")}
                  />
                </View>
                <TouchableOpacity style={styles.btnAdd}>
                  <AntDesign name="pluscircleo" size={24} color={"#FF6C00"} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Регистрация</Text>

              <View
                style={{
                  ...styles.formContainer,
                  marginBottom: isShowKeyboard ? 32 : 43,
                }}
              >
                <TextInput
                  style={styles.input}
                  value={state.nickName}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, nickName: value }))
                  }
                  placeholder="Логин"
                  onFocus={onFocus}
                />
                <TextInput
                  style={styles.input}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({ ...prevState, email: value }))
                  }
                  placeholder="Адрес электронной почты"
                  onFocus={onFocus}
                />
                <View style={{ position: "relative" }}>
                  <TextInput
                    style={{ ...styles.input, marginBottom: 0 }}
                    value={state.password}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    secureTextEntry={isNotShownPassword}
                    onFocus={onFocus}
                  />
                  <TouchableOpacity
                    style={styles.shownBtn}
                    onPress={() => {
                      setIsNotShownPassword((prevState) => !prevState);
                    }}
                  >
                    <Text style={styles.textBtnShown}>Показать</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!isShowKeyboard && (
                <View>
                  <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnTitle}>Зарегистрироваться</Text>
                  </TouchableOpacity>
                  <View style={styles.navigationContainer}>
                    <Text style={styles.bottomText}>Уже есть аккаунт? </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Login", { name: "Login" });
                      }}
                    >
                      <Text style={styles.bottomText}>Войти</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  userImage: {
    position: "absolute",
    top: -60,
    right: Dimensions.get("window").width / 2 - 60,
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  imgWrapper: {
    width: 120,
    height: 120,
  },
  img: {
    borderRadius: 16,
    // borderColor: "#555",
    // borderWidth: 1,
  },
  btnAdd: {
    position: "absolute",
    bottom: 14,
    right: -12.5,
    maxWidth: 25,
  },
  title: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    marginBottom: 33,
    textAlign: "center",
  },

  form: {
    position: "relative",
    width: "100%",
    paddingTop: 92,
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  formContainer: {
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    padding: 16,
    borderColor: "#e8e8e8",
    backgroundColor: "#F6F6F6",
    height: 50,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    color: "#212121",
    fontSize: 16,
  },
  shownBtn: { position: "absolute", top: 15, right: 40 },
  textBtnShown: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingBottom: 16,
    paddingTop: 16,
    color: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#ffffff",
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    textAlign: "center",
    color: "#1B4371",
  },
  navigationContainer: { flexDirection: "row", justifyContent: "center" },
});
