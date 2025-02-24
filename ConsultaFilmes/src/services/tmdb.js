import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// Buscar filmes por nome
export const searchMovies = async (query) => {
  try {
    if (!query) return [];
    
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
        language: "pt-BR",
      },
    });

    return response.data.results || [];
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    return [];
  }
};

// 🔥 Nova função para buscar detalhes de um filme
export const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "pt-BR",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao obter detalhes do filme:", error);
    return null;
  }
};
