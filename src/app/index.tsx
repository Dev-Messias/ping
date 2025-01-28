import React from "react";
import { StatusBar, Text, View } from "react-native";

import Routes from "../routes";

import { AuthProvider } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function Index() {
  return (

    <AuthProvider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" translucent={false} />
      <Routes />
      <Toast/>
    </AuthProvider>

  );
}
