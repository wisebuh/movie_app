import { View, Image,Text, FlatList, ActivityIndicator } from 'react-native';
import { updateSearchCount } from '@/services/appwrite';
import MovieCard from '@/components/movieCard';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { images } from '@/constants/images';
import SearchBar from '@/components/SearchBar';
import { useState, useEffect } from 'react';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("")
  
      const {
        data: movies, 
        loading: moviesLoading, 
        error: moviesError,
        refetch: loadMovies,
        reset
      
      } = useFetch(() => fetchMovies({
        query: searchQuery
      }), false);

      useEffect(()=>{

       
        const timeoutid = setTimeout( async ()=>{
        if (searchQuery.trim()){
          await loadMovies();
        }else{
          reset()
        }
      }, 1000);
      return ()=> clearTimeout(timeoutid)
      },[searchQuery]);
      
      useEffect(()=>{
        if (movies?.length > 0 && movies?.[0])
            updateSearchCount(searchQuery, movies[0])

      },[movies])
    return (
        <View className="flex-1 bg-[#4C2300]">

              {/* <Image source={images.bg} className='"absolute w-full z-0' resizeMode='cover'/> */}

        <FlatList
        data={searchQuery.trim() ? movies : []}

        renderItem={({item})=><MovieCard {...item}/>}
        keyExtractor={(item)=>item.id.toString()}
        numColumns={3}
        className='px-5'
        columnWrapperStyle={{
          justifyContent:"center",
          gap:16,
          marginVertical:16,
        }}
        contentContainerStyle={{
          paddingBottom:100
        }}
        ListHeaderComponent={
          <>
          <View className='w-full flex-row justify-center mt-20'>
            <Image source={images.logo} className='w-full h-14'/>
          </View>
          <View className='my-5'>
            <SearchBar
                placeholder="Search movie..."
                value={searchQuery}
                onChangeText={(text:string) => setSearchQuery(text)} 
              />

          </View>
          {moviesLoading &&(
            <ActivityIndicator size="large" color="#0000ff"  className='my-3'/> 
          )}
          {moviesError &&(
            <Text className="text-red-500 px-5 my-3 ">Error: {moviesError.message}</Text>
          )}

          {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length>0 &&(
          <Text className="text-xl text-white font-bold">
          Search Result for{" "}
          <Text className="text-[#A34C01]">{searchQuery}</Text>
        </Text>
        )}
          </>
        }

        ListEmptyComponent={
          !moviesLoading && !moviesError?(
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim()?"No movies found":"Search for a movie"}
              </Text>
            </View>
          ):null
        }
        />        
        

        </View>
    );
}