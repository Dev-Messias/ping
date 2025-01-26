import React from "react";
import { StatusBar, Text, View } from "react-native";

import Routes from "../routes";

import { AuthProvider } from "../contexts/AuthContext";
import Toast from "react-native-toast-message";

export default function Index() {
  return (

    <AuthProvider>
      <StatusBar backgroundColor="#1E3A8A" barStyle="light-content" translucent={false} />
      <Routes />
      <Toast/>
    </AuthProvider>

  );
}
