import Layout from "../components/Layout";
import Heading from "../components/typography/Heading"
import axios from "axios";
import { TVSHOW_API } from "../constants/Api";
import Image from 'next/image'

export default function Home(props) {
  return (
    <Layout>
      <Heading>Home</Heading>
      <div className="movies-container">
      {props.movies.map((movie) => {
            return (
              <div className="movie-container shadow" key={movie.id}>
              <a href={`movie/${movie.id}`}>
                  <h2 className="movie-title">{movie.name}</h2>
                  <Image src={movie.image.medium} width="200" height="300" alt="My image" className="movie-img"></Image>
              </a>
              </div>
            );
          })}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  let movies = [];
  try {
    const response = await axios.get(TVSHOW_API);
    movies = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      movies: movies,
    },
  };
}