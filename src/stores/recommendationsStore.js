import { atom } from 'nanostores';

const initialRecommendations = []; // Inicializar con un array vacío o con recomendaciones predeterminadas

export const recommendationsStore = atom(initialRecommendations);

export const setRecommendations = (recommendations) => {
    recommendationsStore.set(recommendations);
};

export const addRecommendation = (recommendation) => {
    const currentRecommendations = recommendationsStore.get();
    const updatedRecommendations = [...currentRecommendations, recommendation];
    setRecommendations(updatedRecommendations);
};

export const clearRecommendations = () => {
    setRecommendations([]); // Limpiar las recomendaciones
};
