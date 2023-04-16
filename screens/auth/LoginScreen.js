import { useEffect, useState } from "react";
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
} from "react-native";
import image from "../../assets/images/background.jpg";

import { authSignInUser } from "../../redux/auth/authOperations";

import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
};

const windowDimensions = Dimensions.get("window").width;

export default function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const { email, password } = state;
  const [isNotShownPassword, setIsNotShownPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
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
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={{ ...styles.container, width: dimensions }}>
        <ImageBackground source={image} style={styles.image}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            // keyboardVerticalOffset={-100}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyboard ? 0 : 132,
              }}
            >
              <Text style={styles.title}>Войти</Text>
              <View
                style={{
                  ...styles.formContainer,
                  marginBottom: isShowKeyboard ? 32 : 43,
                }}
              >
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
                    <Text style={styles.btnTitle}>Войти</Text>
                  </TouchableOpacity>
                  <View style={styles.navigationContainer}>
                    <Text style={styles.bottomText}>Нет аккаунта? </Text>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(
                          ("Registration", { name: "Registration" })
                        );
                      }}
                    >
                      <Text style={styles.bottomText}>Зарегистрироваться</Text>
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
  form: {
    width: "100%",
    paddingTop: 32,
    marginTop: "auto",
    backgroundColor: "#ffffff",
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    //  lineHeight: "1.17",
    marginBottom: 33,
    textAlign: "center",
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
    //  lineHeight: 1.19,
    color: "#ffffff",
  },
  bottomText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    //  lineHeight: 1.18,
    textAlign: "center",
    color: "#1B4371",
  },
  navigationContainer: { flexDirection: "row", justifyContent: "center" },
});
