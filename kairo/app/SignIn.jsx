import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Svg, { Path } from "react-native-svg";

const BackIcon = () => (
  <Svg width="33" height="33" viewBox="0 0 33 33" fill="none">
    <Path
      d="M11.3394 14.823L15.1729 10.9787C15.691 10.4592 15.6904 9.6183 15.1716 9.09954C14.6524 8.58026 13.8104 8.58026 13.2912 9.09954L6.62825 15.7624C6.41106 15.9796 6.41106 16.3318 6.62825 16.549L13.2912 23.2119C13.8104 23.7312 14.6524 23.7312 15.1716 23.2119C15.6904 22.6931 15.691 21.8522 15.1729 21.3327L11.3394 17.4885H26.226C26.9621 17.4885 27.5588 16.8918 27.5588 16.1557C27.5588 15.4197 26.9621 14.823 26.226 14.823H11.3394Z"
      fill="#324646"
    />
  </Svg>
);

const SignIn = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    if (username && password) {
      console.log("Sign In:", { username, password });
      router.push({
        pathname: "/ProfileScreen",
        params: { username },
      });
    } else {
      console.log("Please fill in all fields");
    }
  };

  const handleNavigation = (route) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleNavigation("/")}
        >
          <BackIcon />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="rgba(46, 58, 89, 0.5)"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="rgba(46, 58, 89, 0.5)"
          secureTextEntry
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSignIn}>
          <Text style={styles.submitButtonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => handleNavigation("/SignUp")}
        >
          <Text style={styles.switchText}>
            Don't have an account? Sign Up
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 42,
    paddingHorizontal: 33,
    paddingBottom: 42,
    alignItems: "center",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 33,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#2E3A59",
    marginBottom: 40,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#098CB4",
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    fontSize: 17,
    color: "#2E3A59",
    fontWeight: "500",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(46, 58, 89, 0.2)",
  },
  submitButton: {
    backgroundColor: "#098CB4",
    borderRadius: 55,
    marginTop: 35,
    paddingVertical: 17,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "600",
  },
  switchButton: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    fontSize: 16,
    color: "#2E3A59",
    fontWeight: "500",
    opacity: 0.7,
  },
});

export default SignIn;