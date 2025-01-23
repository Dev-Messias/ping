import React from "react";
import { StatusBar, Text, View } from "react-native";

import Routes from "../routes";

export default function Index() {
  return (

    <>
      <StatusBar backgroundColor="#1E3A8A" barStyle="light-content" translucent={false} />
      <Routes />
    </>

  );
}
