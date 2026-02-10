import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import { images } from "@/constants/images";
import SearchBar from "@/components/SearchBar";
import MovieCard from "@/components/movieCard";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
 
export default function App() {
  const router = useRouter();

  const {
    data: movies, 
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({
    query: ""
  }));

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView 
        className="flex-1 px-5"
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={images.logo} className="w-full h-14 mt-20 mb-5 mx-auto" />

        {/* SearchBar always visible */}
        <SearchBar 
          onPress={() => router.push("/search")}
          placeholder="Search for a movie"
          onChangeText={()=>{}}
          value=""
        />

        {/* Conditional content below search bar */}
        {moviesLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <View className="mt-5">
            <Text className="text-red-500 text-center">
              Error: {moviesError.message}
            </Text>
          </View>
        ) : (
          <View className="flex-1 mt-5">
            <Text className="text-lg text-white font-bold mb-3">
              Latest Movies
            </Text>
            <FlatList
              data={movies}
              renderItem={({ item }) => (
                  <MovieCard {...item} />
              )}
              keyExtractor={(item) => item.id.toString()} // ✅ Fixed
              numColumns={3}
              columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
          />
            
          </View>
        )}
      </ScrollView>
    </View>
  );
}