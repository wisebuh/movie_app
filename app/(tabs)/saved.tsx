import { View, Text } from 'react-native'
import colors from '@/hooks/usetheme'
import { MaterialIcons } from '@expo/vector-icons'

export default function profile() {
  return (
    <View style={{backgroundColor: colors.bg}} className='flex-1 px-10'>
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <MaterialIcons name='save' className='size-10' color='#fff'/>
        <Text className='text-gray-400 text-base'>Save</Text>
      </View>     
    </View>
  )
}