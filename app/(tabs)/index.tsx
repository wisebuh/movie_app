import { Text, View, Image, ScrollView } from "react-native";
import {images} from "@/constants/images"
 
export default function App() {
  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg}  className="absolute w-full z-0"/>
      <ScrollView  className="flex-1 px-5">
        <Image source={images.logo} className="w-full h-14 mt-20 mb-5 mx-auto"/>
        <Text>Hello</Text>
      </ScrollView>
    </View>
  );
}