import * as SecureStore from "expo-secure-store";

export async function getAuthenticated() {
    const token = await SecureStore.getItemAsync("token");
    return { isAuthenticated: !!token, token };
}