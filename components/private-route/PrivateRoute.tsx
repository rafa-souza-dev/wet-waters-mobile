import { ReactNode, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { router } from "expo-router";

interface PrivateRouteProps {
    children: ReactNode
}

export function PrivateRoute({ children }: PrivateRouteProps) {
    const { token } = useContext(AuthContext)

    useEffect(() => {
        if (token) router.push('/')
    }, [])

    return children
}
