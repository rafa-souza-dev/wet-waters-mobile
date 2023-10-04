import { useContext } from 'react';
import{ View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
import { deleteItemAsync } from "expo-secure-store";
import { router } from 'expo-router';

export default function Profile() {
    const { setToken } = useContext(AuthContext)

    async function handleLogout() {
        setToken(null)
        await deleteItemAsync("token");

        router.push('/')
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleLogout}>
                Sair do Software
            </TouchableOpacity>
        </View>
    )
}