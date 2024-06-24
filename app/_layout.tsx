import React from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Tab One",
            headerShown: false,
          }}
        />
                <Stack.Screen
          name="other"
          options={{
            title: "Other",
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
};

export default RootLayout;
