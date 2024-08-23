export const saveRecipesToLocalStorage = (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
};

export const getRecipesFromLocalStorage = () => {
    const recipes = localStorage.getItem('recipes');
    return recipes ? JSON.parse(recipes) : [];
};