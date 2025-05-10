import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
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
