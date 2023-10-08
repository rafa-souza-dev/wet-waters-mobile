import { useContext } from 'react';
import{ View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AuthContext } from '../../contexts/auth';
import { deleteItemAsync } from "expo-secure-store";
import { router } from 'expo-router';

export default function Profile() {
    const { setUser } = useContext(AuthContext)

    async function handleLogout() {
        await deleteItemAsync("token");
        setUser(null);

    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Profile</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Sair do Software</Text>
            </TouchableOpacity>
        </View>
    )
}