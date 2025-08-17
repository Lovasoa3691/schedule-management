import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  //   CheckBox,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";

export default function RegisterScreen() {
  const [rememberMe, setRememberMe] = React.useState(false);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.logoCard}>
        <Text style={{ fontSize: 40, fontWeight: "bold", alignSelf: "center" }}>
          Sched.<Text style={{ color: "blue" }}>Connect</Text>
        </Text>
      </View>
      <Text style={styles.title}>Creer votre compte</Text>

      <View style={styles.inputContainer}>
        <Icon name="person-outline" size={20} color="#666" />
        <TextInput
          placeholder="Nom complet"
          placeholderTextColor={"gray"}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="mail-outline" size={20} color="#666" />
        <TextInput
          placeholder="Adresse mail"
          placeholderTextColor={"gray"}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="call-outline" size={20} color="#666" />
        <TextInput
          placeholder="Telephone"
          placeholderTextColor={"gray"}
          style={styles.input}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          placeholder="Mot de passe"
          placeholderTextColor={"gray"}
          style={styles.input}
          secureTextEntry
        />
        <Icon name="eye-outline" size={20} color="#ccc" />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-closed-outline" size={20} color="#666" />
        <TextInput
          placeholder="Confirmation"
          placeholderTextColor={"gray"}
          style={styles.input}
          secureTextEntry
        />
        <Icon name="eye-outline" size={20} color="#ccc" />
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Inscrire</Text>
      </TouchableOpacity>

      <View style={styles.row}>
        <Text style={styles.signup}>J'ai deja un compte</Text>
        <TouchableOpacity>
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Se connecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffffff",
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "#fff",
    padding: 25,
    width: "85%",
    borderRadius: 15,
    elevation: 10,
    shadowColor: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    color: "#666",
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  remember: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberText: {
    marginLeft: 5,
    fontSize: 14,
  },
  link: {
    color: "#3a5dd9",
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: "#3a5dd9",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  signup: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 14,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  or: {
    marginHorizontal: 8,
    color: "#888",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialButton: {
    backgroundColor: "#fff",
    borderRadius: 50,
    // padding: 10,
    elevation: 3,
  },
  socialIcon: {
    width: 35,
    height: 35,
  },
  logoCard: {
    paddingBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
});
