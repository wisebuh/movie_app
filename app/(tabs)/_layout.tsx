import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from "@expo/vector-icons";
import { ImageBackground } from "react-native";
import {images} from "@/constants/images"
import { Text, View } from "react-native";
import cn from "clsx"
import colors from "@/hooks/usetheme";



const TabIcon = ({focused, icon,title }:any)=>(
    focused?(
     <ImageBackground 
            source={images.highlight}
            className="flex flex-row w-full flex-1 min-w-[112px]  min-h-16 mt-4
                 justify-center items-center rounded-full overflow-hidden">
                <Ionicons name={icon} size={15} color={focused}  />
                <Text className="text-secondary text-base font-bold ml-2">{title}</Text>
    </ImageBackground >):
    (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Ionicons name={icon} size={20} color={colors.text}  />
        </View>
    )
)


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
        tabBarShowLabel:false,
        tabBarItemStyle:{
            width: '100%',
            height:"100%",
            justifyContent:"center",
            alignItems:"center"
        },
        tabBarStyle:{
            backgroundColor:colors.bg,
            margin:10,
            borderRadius:50,
            marginHorizontal:20,
            marginBottom:36,
            height: 52,
            position:"absolute",
            overflow:"hidden",
            borderWidth:1,
            borderColor:colors.bg
        },
        tabBarInactiveTintColor:colors.tintColor,
        tabBarActiveTintColor:colors.primary,
        tabBarLabelStyle:{
            fontSize: 10,
            color:"#000"
        }
        }}>
        <Tabs.Screen
        name="index"
        options={{
            
            title:"Home",
            tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon="home" title="Home"/>)

        }}
        />

        <Tabs.Screen
        name="search"
        options={{
            title:"Search",
           tabBarIcon: ({ focused }) => (
           <TabIcon focused={focused} icon="search" title="Search"/>
           ) 
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title:"Profile",
            tabBarIcon:({focused})=>(
                 <TabIcon focused={focused} icon="person" title="Profile"/>
            )
        }}/>

        <Tabs.Screen
        name="saved"
        options={{
            title:"Saved",
            tabBarIcon:({focused})=>(
                 <TabIcon focused={focused} icon="bookmark" title="Saved" />
                 
            )
        }}
        />
    </Tabs>
  )
}