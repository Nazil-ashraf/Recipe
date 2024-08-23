import React from 'react';
import './ComponentStyle.scss';
import Button from '../Atoms/Button';
import { useRecipeContext } from '../Context/AppContext';

const RecipeCard = ({ item, title, ingredients, steps, handleClickEdit }) => {
    const { handleDeleteRecipe } = useRecipeContext();

    const handleDelete = () => {
        handleDeleteRecipe(item?.id)
    }
    return (
        <div className="card">
            <h2>{title}</h2>

            <h4>Ingredients:</h4>
            <div className='card-ingredient-container'>
                {ingredients?.map((ingredient, index) => (
                    <div className='card-ingredient' key={index}>{ingredient}</div>
                ))}
            </div>



            <h4>Preperation Steps:-</h4>
            <div className='card-step-container'>
                {steps?.map((step, index) => (
                    <div className="card-step" key={index}><strong>{step.name}:</strong> {step.value}</div>
                ))}
            </div>


            <div className='card-button'>
                <Button title={'Edit'} handleClick={handleClickEdit} />
                <Button title={'Delete'} handleClick={handleDelete} />
            </div>
        </div>
    );
};

export default RecipeCard;
