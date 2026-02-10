import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Link } from 'expo-router'; // ✅ Fixed import
import { MaterialIcons } from '@expo/vector-icons';

interface Movie {
    id: number;
    poster_path: string | null;
    title: string;
    vote_average: number;
    release_date: string;
}

export default function MovieCard({ id, poster_path, title, vote_average, release_date }: Movie) {
    return (
        <Link href={`/movies/${id}`} asChild>
            <TouchableOpacity className="w-[30%]">
                <Image
                    source={{
                        uri: poster_path
                            ? `https://image.tmdb.org/t/p/w500${poster_path}`
                            : "https://placeholder.co/600x400/1a1a1a/fff.png" // ✅ Fixed URL
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                <View className='flex-row item-cnter justify-start gap-x-1'>
                    <MaterialIcons name="star" size={12} color="gold" />
                    <Text className='text-white  text-xs font-bold uppercase'>{Math.round(vote_average/2)}</Text>
                </View>
                <View className='flex-row item-center justify-between'>
                    <Text className='text-xs text-light-300 font-medium mt-1'>
                        {release_date?.split('-')[0]}
                    </Text>
                    {/* <Text className='text-xs font-medium text-light-300 uppercase mt-1'>Movie</Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    );
}