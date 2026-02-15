import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from 'expo-linear-gradient';

export default function TrendingCard({ movie: { movie_id, title, poster_url }, index }: TrendingCardProps) {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="relative">
        {/* Movie Poster */}
        <Image
          source={{ uri: poster_url }}
          className="w-36 h-52 rounded-2xl"
          resizeMode="cover"
        />
        
        {/* Gradient Overlay at Bottom */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          className="absolute bottom-0 w-full h-20 rounded-b-2xl px-2 justify-end pb-2"
        >
          <Text className="text-white text-xs font-semibold" numberOfLines={2}>
            {title}
          </Text>
        </LinearGradient>

        {/* Ranking Badge */}
        <View className="absolute -top-2 -left-2">
          <MaskedView
            style={{ width: 50, height: 50 }}
            maskElement={
              <View className="bg-white w-full h-full rounded-full items-center justify-center">
                <Text className="font-black text-3xl">
                  {index + 1}
                </Text>
              </View>
            }
          >
            <LinearGradient
              colors={['#FFD700', '#FF6B00']}
              style={{ width: 50, height: 50 }}
            />
          </MaskedView>
        </View>

        {/* Optional: Trending Badge */}
        <View className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded-full">
          <Text className="text-white text-xs font-bold">🔥 HOT</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}



