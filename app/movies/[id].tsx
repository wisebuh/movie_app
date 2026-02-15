import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 font-normal text-sm'>{label}</Text>
    <Text className='text-light-100 font-bold text-sm'>{value || "N/A"}</Text>
  </View>
);

export default function MovieDetails() {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));
  const router = useRouter();

  if (loading) {
    return (
      <View className='flex-1 bg-[#6D3301] items-center justify-center'>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View className='bg-[#6D3301] flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className='w-full h-[550px]' 
            resizeMode='cover'
          />
        </View>        
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          
          <View className='flex-row items-center gap-x-1 mt-2'>
            <Text className='text-light-200 text-sm'>
              {movie?.release_date?.split('-')[0]}
            </Text>
            <Text className='text-light-200 text-sm'>•</Text>
            <Text className='text-light-200 text-sm'>{movie?.runtime}m</Text>
          </View>

          <View className='flex-row items-center bg-[#A34C01] px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Ionicons name='star' color="yellow" size={15} />
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-light-200 text-start'>
              {movie?.vote_count} votes
            </Text>
          </View>

          <MovieInfo label='Overview' value={movie?.overview} />
          <MovieInfo 
            label='Genres' 
            value={movie?.genres?.map((g) => g.name).join(' • ') || "N/A"} 
          />

          <View className='flex-row justify-between w-full'>
            <MovieInfo 
              label='Budget' 
              value={movie?.budget ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : "N/A"} 
            />
            <MovieInfo 
              label='Revenue' 
              value={movie?.revenue ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : "N/A"} 
            />
          </View>

          <MovieInfo 
            label='Production Companies' 
            value={movie?.production_companies?.map((c) => c.name).join(' • ') || "N/A"} 
          />
        </View>
      </ScrollView>

      <TouchableOpacity 
        className='absolute bottom-5 left-5 right-5 bg-amber-400 rounded-lg py-3.5 flex-row items-center justify-center z-50' 
        onPress={() => router.back()}
      >
        <Ionicons name='arrow-back' size={20} color="#fff" />
        <Text className='text-white font-semibold text-base ml-2'>Go back</Text>
      </TouchableOpacity>
    </View>
  );
}




