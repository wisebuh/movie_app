import { Text, View, Image, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/movieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "@/components/TrendingCard";
 
export default function App() {
  const router = useRouter();
    
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError
  } = useFetch(getTrendingMovies);

  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      
      <FlatList
        data={movies || []}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10
        }}
        className="px-5"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <Image source={images.logo} className="w-full h-14 mt-20 mb-5 mx-auto" />

            <SearchBar 
              onPress={() => router.push("/search")}
              placeholder="Search for a movie"
            />

            {(moviesLoading || trendingLoading) && (
              <ActivityIndicator
                size="large"
                color="#fff"
                className="mt-10 self-center"
              />
            )}

            {(moviesError || trendingError) && (
              <View className="mt-5">
                <Text className="text-red-500 text-center">
                  Error: {moviesError?.message || trendingError?.message}
                </Text>
              </View>
            )}

            {!trendingLoading && !trendingError && trendingMovies && trendingMovies.length > 0 && (
              <View className="mt-10 mb-5">
                <Text className="text-lg text-white font-bold mb-3">
                  Trending Movies
                </Text>
                <FlatList
                  data={trendingMovies}
                                  renderItem={({ item, index }) => (
                  <View className="mr-4 w-32">
                    <TrendingCard movie={item} index={index} />
                  </View>
                )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                />
              </View>
            )}

            {!moviesLoading && !moviesError && movies && movies.length > 0 && (
              <Text className="text-lg text-white font-bold mb-3 mt-5">
                Latest Movies
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <Text className="text-white text-center mt-10">
              No movies found
            </Text>
          ) : null
        }
      />
    </View>
  );
}






