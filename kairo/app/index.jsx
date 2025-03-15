import { Redirect } from "expo-router";

export default function Index() {
  console.log("Redirecting to /SignUp from index.jsx");
  return <Redirect href="/SignUp" />;
}