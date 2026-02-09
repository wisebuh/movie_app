import { Tabs } from "expo-router"
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        headerShown:false,
        tabBarStyle:{
            backgroundColor:"#000"
        },
        tabBarInactiveTintColor:"#333",
        tabBarActiveTintColor:"#fff",
        tabBarLabelStyle:{
            fontSize: 15,
            color:"#fff"
        }
        }}>
        <Tabs.Screen
        name="index"
        options={{
            
            title:"Home",
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />)

        }}
        />

        <Tabs.Screen
        name="search"
        options={{
            title:"Search",
            tabBarIcon:({color, size})=>(
            <LinearGradient
                colors={['#ff7a18', '#ffb347']}
                className="p-2 rounded-full"
                >
                <Ionicons name="search" size={size} color={color} />
            </LinearGradient>

            )
        }}
        />
        <Tabs.Screen
        name="profile"
        options={{
            title:"Profile",
            tabBarIcon:({color, size})=>(
                 <Ionicons name="person" size={size} color={color}/>
            )
        }}/>

        <Tabs.Screen
        name="saved"
        options={{
            title:"Saved",
            tabBarIcon:({color, size})=>(
                 <Ionicons name="save" size={size} color={color}/>
            )
        }}
        />
    </Tabs>
  )
}