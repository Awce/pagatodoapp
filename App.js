import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import BanksListScreen from "./screens/BanksListScreen";

export default function App() {
  return (
    <>
      <NativeBaseProvider>
        <BanksListScreen />
      </NativeBaseProvider>
      <StatusBar style="auto" />
    </>
  );
}
