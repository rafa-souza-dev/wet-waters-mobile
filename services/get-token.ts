import * as SecureStore from "expo-secure-store";

export async function getToken() {
    const token = await SecureStore.getItemAsync("token");
    return { isAuthenticated: !!token, token };
}