import React from "react";
import { StatusBar, Text, View } from "react-native";

import Routes from "../routes";

import { AuthProvider } from "../contexts/AuthContext";

export default function Index() {
  return (

    <AuthProvider>
      <StatusBar backgroundColor="#1E3A8A" barStyle="light-content" translucent={false} />
      <Routes />
    </AuthProvider>

  );
}
