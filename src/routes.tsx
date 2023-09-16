import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ListAnimals } from "./screens/listAnimals";
import CreateAnimal from "./screens/createAnimal";
import { AnimalInfor } from "./screens/animalInfor";
import { ListPosts } from "./screens/listPosts";
import { PostInfor } from "./screens/postInfor";
import { Login } from "./screens/login";
import { CreatePost } from "./screens/createPost";
import React from "react";

type RootParam = {
  Login: undefined;
  CreateAnimal: { setAnimals: () => void; saia: (id: number) => void};
  CreatePost: { setPosts: () => void; saia: (id: number) => void };
  Animais: undefined;
  AnimalInfor: { id: number };
  ListPosts: undefined;
  PostInfor: { id: number };
};

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/808f466cb4a10d5d67f3",
};

export function Routes() {
  const { Navigator, Screen, Group } = createNativeStackNavigator<RootParam>();

  return (
    <Navigator
      initialRouteName="ListPosts"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="ListPosts" component={ListPosts} />
      <Screen name="PostInfor" component={PostInfor} />
      <Screen name="Animais" component={ListAnimals} />
      <Screen name="CreateAnimal" component={CreateAnimal} />
      <Screen name="CreatePost" component={CreatePost} />
      <Screen name="AnimalInfor" component={AnimalInfor} />
      <Screen name="Login" component={Login} />
    </Navigator>
  );
}
