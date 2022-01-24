import { TVSHOW_API } from "../../constants/Api";
import Layout from "../../components/Layout";
import axios from "axios";
import Heading from "../../components/typography/Heading";
import Image from "next/image";

export default function Movie({ movie }) {

  function createMarkup(movie) {
    return { __html: movie.summary };
  }

  return (
    <Layout>
      <Heading>{movie.name}</Heading>

      <div className="movie-details-container shadow">

      <div className="details">
      <div className="img-container">
      <Image
        src={movie.image.medium}
        width="200"
        height="300"
        alt="My image">
      </Image>
      </div>

      <div className="movie-summary-container">
      <h3 className="summary-title">Summary:</h3>
      <div dangerouslySetInnerHTML={createMarkup(movie)} className="movie-summary"></div>
      </div>
      </div>

      <div className="genre-container">
      <h3 className="genre-title">Genre:</h3>
      {movie.genres.map((genre) => {
        return <p key={Math.random()} className="movie-genre">{genre}</p>;
      })}
      </div>

      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  try {
    const response = await axios.get(TVSHOW_API);

    const movies = response.data;

    const paths = movies.map((movie) => ({
      params: { id: JSON.stringify(movie.id) },
    }));

    return { paths: paths, fallback: false };
  } catch (error) {
    console.log(error);
  }
}

export async function getStaticProps({ params }) {
  const url = `${TVSHOW_API}/${params.id}`;

  let movie = null;

  try {
    const response = await axios.get(url);
    movie = response.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: { movie: movie },
  };
}