import React from "react";
import { View, Text, Button } from "react-native";
import { useClerk } from "@clerk/clerk-expo";

const HomeScreen = () => {
  const { signOut } = useClerk();

  return (
    <View>
      <Text>HomeScreen</Text>
      <Button onPress={async () => await signOut()} title="logout"></Button>
    </View>
  );
};

export default HomeScreen;
