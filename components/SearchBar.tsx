import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import colors from '@/hooks/usetheme'
import { useRouter } from 'expo-router';

interface props{
    onPress:()=>void;
    placeholder:string
}

export default function SearchBar({onPress, placeholder}:props) {  
  return (
    <View className='flex-row items-center bg-[#6D33011A] rounded-full px-5 py-4'>
      <Ionicons name='search' size={20} color={colors.text} style={{opacity:.5}}/>
      <TextInput
      onPress={onPress} value=''
      placeholder={placeholder}
      onChange={()=>{}}
      placeholderTextColor={colors.textMuted}
      className='flex-1 ml-2 text-white'/>
    </View>
  )
}