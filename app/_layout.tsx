import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Movies",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: "Movie Details",
            headerShown: true,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
