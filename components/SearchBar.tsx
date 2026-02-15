import colors from '@/hooks/usetheme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TextInput, View } from 'react-native';

interface props{
    onPress?:()=>void;
    placeholder:string;
    value?: string;
    onChangeText?: (text:string)=>void;
}

export default function SearchBar({onPress, placeholder, value, onChangeText}:props) {  
  return (
    <View className='flex-row items-center bg-[#6D33011A] rounded-full px-5 py-4'>
      <Ionicons name='search' size={20} color={colors.text} style={{opacity:.5}}/>
      <TextInput
      onPress={onPress} 
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={colors.textMuted}
      className='flex-1 ml-2 text-white'/>
    </View>
  )
}