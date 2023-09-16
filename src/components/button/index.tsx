import { ReactNode } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

interface ButtonProps {
    children: ReactNode;
    onPress?: () => void;
    style?: ViewStyle;
}

export function Button({ children, onPress, style }: ButtonProps) {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={style} >
        {children}
      </TouchableOpacity>
    );
  }