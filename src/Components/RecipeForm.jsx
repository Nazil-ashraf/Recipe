
import './ComponentStyle.scss';
import Button from '../Atoms/Button';
import { useRecipeContext } from '../Context/AppContext';
import { useState } from 'react';
import CommonInput from '../Atoms/Input';
import { TEXT } from '../Constant/TextConstant';

export const RecipeForm = ({ input, setInput }) => {

    const [currentIngredient, setCurrentIngredient] = useState('');
    const [currentStep, setCurrentStep] = useState('');
    const { state, handleAddRecipe, handleEditRecipe } = useRecipeContext();

    const handleTitle = (e) => {
        setInput((prev) => ({ ...prev, title: e.target.value }));
    };

    const handleIngredientChange = (e) => {
        const value = e.target.value;
        // Allow only alphabets
        if (/^[A-Za-z\s]*$/.test(value)) {
            setCurrentIngredient(value);
        }
    };

    const handleAddIngredient = () => {
        if (currentIngredient.trim() !== '') {
            setInput((prev) => ({
                ...prev,
                ingredients: [...prev.ingredients, currentIngredient.trim()],
            }));
            setCurrentIngredient('');
        }
    };

    const handleDeleteIngredient = (indexToRemove) => {
        setInput((prev) => ({
            ...prev,
            ingredients: prev.ingredients.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleStepChange = (e) => {
        setCurrentStep(e.target.value);
    };

    const handleAddStep = () => {
        if (currentStep.trim() !== '') {
            const newStep = { name: `STEP ${input.steps.length + 1}`, value: currentStep.trim() };
            setInput((prev) => ({
                ...prev,
                steps: [...prev.steps, newStep],
            }));
            setCurrentStep('');
        }
    };

    const handleDeleteStep = (indexToRemove) => {
        setInput((prev) => ({
            ...prev,
            steps: prev.steps.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSubmit = () => {
        console.log(state.newRecipe?.isEdit, 'state.newRecipe?.isEdit')
        if (state.newRecipe?.isEdit) {
            handleEditRecipe(input?.id, input)
        } else {
            handleAddRecipe(state.recipes.length, input)
        }

        setInput({
            title: '',
            ingredients: [],
            steps: [],
        })
    }


    return (
        <div className="container">
            <CommonInput
                placeholder={TEXT.PLACE_HOLDER_RECIPE}
                title={TEXT.TITLE_OF_RECIPE}
                value={input.title}
                onChange={handleTitle}
            />
            <div className="flex">
                <CommonInput
                    placeholder={TEXT.PLACE_HOLDER_INGREDENT}
                    title={TEXT.TITLE_OF_INGREDENT}
                    value={currentIngredient}
                    onChange={handleIngredientChange}
                />
                <Button
                    handleClick={handleAddIngredient}
                    title={TEXT.ADD}
                    className={'button--add'}
                />
            </div>
            <div className="list">
                {input.ingredients?.length > 0 && <h3>Ingredients:</h3>}

                {input.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-item">
                        {ingredient}
                        <Button
                            handleClick={() => handleDeleteIngredient(index)}
                            title={TEXT.DELETE}
                            className={'delete-button'} />
                    </div>
                ))}

            </div>

            <div className="flex">
                <CommonInput
                    placeholder={TEXT.PLACE_HOLDER_STEP}
                    title={TEXT.TITLE_OF_STEP}
                    value={currentStep}
                    onChange={handleStepChange}
                    multiline
                />
                <Button handleClick={handleAddStep} title={TEXT.ADD} className={'button--add'} />

            </div>

            <div className="list">
                {input.steps.length > 0 && <h3>Preparation Steps:</h3>}

                {input.steps.map((step, index) => (
                    <div key={index} className="ingredient-item">
                        <div key={index} className="step-text">  {step.name}: {step.value}</div>

                        <Button
                            handleClick={() => handleDeleteStep(index)}
                            title={TEXT.DELETE}
                            className={'delete-button'} />

                    </div>
                ))}

            </div>

            <Button title={'Submit'} handleClick={handleSubmit} />
        </div>
    )
}

export default RecipeForm