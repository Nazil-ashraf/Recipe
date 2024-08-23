import React, { createContext, useContext, useReducer } from 'react';
import { getRecipesFromLocalStorage, saveRecipesToLocalStorage } from '../Utils/localStorage';

// Initial State
const initialState = {
    recipes: getRecipesFromLocalStorage(),
    newRecipe: { isNewRecipe: false, isEdit: false },
    searchInput: '',
    filteredRecipes: [],
};

// Reducer for Recipe
const recipeReducer = (state, action) => {
    switch (action.type) {
        case 'INITIAL_LOAD':
            return {
                ...state,
                recipes: action.payload,
                filteredRecipes: action.payload,
            };
        case 'NEW_RECIPE':
            const newRecipe = {
                title: '',
                ingredients: [],
                steps: [],
                id: state.recipes.length + 1,
            };
            return {
                ...state,
                recipes: [...state.recipes, newRecipe],
                filteredRecipes: [...state.recipes, newRecipe],
                newRecipe: { ...state.newRecipe, isNewRecipe: true },
            };
        case 'ADD_RECIPE':
            const updatedRecipes = state.recipes.map((recipe) =>
                recipe.id === action.payload.id
                    ? { ...recipe, ...action.payload.data }
                    : recipe
            );
            saveRecipesToLocalStorage(updatedRecipes)
            return {
                ...state,
                recipes: updatedRecipes,
                filteredRecipes: filterRecipes(updatedRecipes, state.searchInput),
                newRecipe: { ...state.newRecipe, isNewRecipe: false, isEdit: false },
            };
        case 'EDIT_RECIPE':
            return {
                ...state,
                newRecipe: { ...state.newRecipe, isEdit: true },
            };
        case 'ADD_EDIT_RECIPE':
            const updatedRecipe = state.recipes.map((recipe) =>
                recipe.id === action.payload.id
                    ? { ...recipe, ...action.payload.data }
                    : recipe
            );
            saveRecipesToLocalStorage(updatedRecipe)
            return {
                ...state,
                recipes: updatedRecipe,
                filteredRecipes: filterRecipes(updatedRecipe, state.searchInput),
                newRecipe: { ...state.newRecipe, isEdit: false },
            };

        case 'DELETE_RECIPE':
            const remainingRecipes = state.recipes.filter((recipe) => recipe.id !== action.payload.id);
            saveRecipesToLocalStorage(remainingRecipes)
            return {
                ...state,
                recipes: remainingRecipes,
                filteredRecipes: filterRecipes(remainingRecipes, state.searchInput),
            };
        case 'SET_SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.payload,
                filteredRecipes: filterRecipes(state.recipes, action.payload),
            };
        default:
            return state;
    }
};

// Function to filter recipes
const filterRecipes = (recipes, query) => {
    if (!query) return recipes;
    return recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query.toLowerCase()) ||
        recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()))
    );
};

// Create context
const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(recipeReducer, initialState);

    const handleNewRecipe = () => {
        dispatch({ type: 'NEW_RECIPE' });
    };

    const handleAddRecipe = (id, data) => {
        dispatch({
            type: 'ADD_RECIPE',
            payload: { id, data },
        });
    };

    const handleEditRecipe = (id, data) => {
        dispatch({
            type: 'ADD_EDIT_RECIPE',
            payload: { id, data },
        });
    };

    const handleCickEditRecipe = (id, data) => {
        dispatch({
            type: 'EDIT_RECIPE',
        });
    };

    const handleDeleteRecipe = (id) => {
        dispatch({
            type: 'DELETE_RECIPE',
            payload: { id },
        });
    };

    const handleSearchInput = (query) => {
        console.log(query, 'onChange={(e) => handleSearchInput(e.target.value)}')
        dispatch({
            type: 'SET_SEARCH_INPUT',
            payload: query,
        });
    };

    return (
        <AppContext.Provider value={{ state, dispatch, handleNewRecipe, handleAddRecipe, handleEditRecipe, handleDeleteRecipe, handleSearchInput, handleCickEditRecipe }}>
            {children}
        </AppContext.Provider>
    );
};

export const useRecipeContext = () => useContext(AppContext);
