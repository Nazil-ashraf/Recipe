import { useEffect, useState } from 'react';
import './ComponentStyle.scss';
import { useRecipeContext } from '../Context/AppContext';
import RecipeCard from './RecipeCard';
import RecipeForm from './RecipeForm';
import { getRecipesFromLocalStorage } from '../Utils/localStorage';

export const Content = () => {

    const { state, handleCickEditRecipe, dispatch } = useRecipeContext();
    const [input, setInput] = useState({
        title: '',
        ingredients: [],
        steps: [],
    });

    // set Local Storage
    useEffect(() => {
        const recipes = getRecipesFromLocalStorage();
        if (recipes) {

            dispatch({ type: 'INITIAL_LOAD', payload: recipes });
        }
    }, [dispatch]);


    const handleClickEdit = (item) => {
        handleCickEditRecipe()
        setInput(item)

    }


    return (
        <div className="content">
            {state?.newRecipe?.isNewRecipe || state?.newRecipe?.isEdit ? (
                <RecipeForm
                    input={input}
                    setInput={setInput}
                />
            ) : (
                <div className='card-container'>
                    {state?.filteredRecipes?.map((item) =>
                        <RecipeCard
                            title={item?.title}
                            ingredients={item?.ingredients}
                            steps={item?.steps}
                            item={item}
                            handleClickEdit={() => handleClickEdit(item)}

                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Content;
