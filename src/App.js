import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState(null);

  // const fetchMoviesHandler = useCallback(async () => {
  //   setIsLoading(true);

  //   setErrors(null);

  //   try {
  //     const res = await fetch(
  //       "https://swapi.dev/api/films/"
  //     );

  //     if (!res.ok) throw new Error("Something went wrong!");

  //     const data = await res.json();

  //     const results = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       };
  //     });

  //     setMovies(results);

  //     setIsLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setErrors(err.message);
  //   }

  //   setIsLoading(false);
  // }, []);

  //This is for fetch data from an database API.
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);

    setErrors(null);

    try {
      const res = await fetch(
        "https://react-api-ccbb3-default-rtdb.firebaseio.com/movies.json"
      );

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      const results = [];

      for (const key in data) {
        console.log(key);
        results.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }

      console.log(results);

      setMovies(results);

      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setErrors(err.message);
    }

    setIsLoading(false);
  }, []);

  //This is to send data to a data base API.
  const addMoviesHandler = async (movie) => {
    try {
      const res = await fetch(
        "https://react-api-ccbb3-default-rtdb.firebaseio.com/movies.json",
        {
          method: "POST",
          body: JSON.stringify(movie),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();

      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies...</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (errors) {
    content = <p>{errors}</p>;
  }

  if (isLoading) {
    content = <p>Loading....</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMoviesHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
