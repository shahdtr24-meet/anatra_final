import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="SignUp" options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen name="TaskCalendar" options={{ headerShown: false }} />
      <Stack.Screen name="Shop" options={{ headerShown: false }} />
      <Stack.Screen name="LeaderBored" options={{ headerShown: false }} />
    </Stack>
  );
}