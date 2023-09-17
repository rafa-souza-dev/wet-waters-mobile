import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { UserContext } from "../../contexts/user";

interface ScreenHeaderProps {
    text: string
    leftIcon?: {
        action: () => void,
        icon: React.ReactNode
    }
}

export function ScreenHeader({
    leftIcon,
    text
}: ScreenHeaderProps) {
    const { point } = useContext(UserContext)

    return (
        <View
            style={{
                width: "100%",
                height: 50,
                justifyContent: "space-between",
                backgroundColor: "white",
                alignItems: "center",
                paddingHorizontal: 10,
                flexDirection: "row"
            }}
        >
            {
                <TouchableOpacity
                    style={{
                        width: 25,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                    onPress={leftIcon?.action}
                >
                    {leftIcon?.icon}
                </TouchableOpacity>
            }

            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 20
                }}
            >
                {text}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center"
                }}
            >
                <MaterialCommunityIcons name="fish-off" size={24} color="#3BA5DA" />
                <Text
                    style={{
                        fontWeight: "bold"
                    }}
                >
                    {point}
                </Text>
            </View>
        </View>
    )
}