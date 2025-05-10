import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulated loading time
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          animation: "none",
          animationDuration: 0,
        }}
      >
        <Stack.Screen
          name="screens/HomeScreen"
          options={{
            title: "Movies",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/ExploreScreen"
          options={{
            title: "Explore",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/SearchScreen"
          options={{
            title: "Search",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="screens/FavoritesScreen"
          options={{
            title: "Favorites",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: "Movie Details",
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
