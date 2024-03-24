import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ModalHeaderText from "@/components/ModalHeaderText";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const router = useRouter();
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="listing/[id]" options={{ headerTitle: "" }} />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
            <Stack.Screen
              name="(modals)/booking"
              options={{
                presentation: "modal",
                animation: "fade",
                headerTransparent: true,
                headerShown: true,
                headerTitle: (props) => <ModalHeaderText />,
                headerLeft: () => null,
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => router.back()}
                    style={{
                      backgroundColor: "#fff",
                      borderColor: Colors.grey,
                      borderRadius: 20,
                      borderWidth: 1,
                      padding: 4,
                    }}
                  >
                    <Ionicons name="close-outline" size={22} />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </>
  );
}
