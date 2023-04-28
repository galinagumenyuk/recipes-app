import { useParams, useNavigate, useLocation} from "react-router-dom";
import { useState, useEffect } from "react";
import * as apiService from "../../APIservice";
import s from "./Card.module.css";



const Card = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState(null);

    useEffect(() => {
        apiService.fetchRecipeDetails(recipeId)
            .then(setRecipe);
        apiService.fetchIngredients(recipeId)
            .then(setIngredients);
    }, [recipeId]);
    
    const onGoBack = () => {
        (location.state && location.state.from) ? navigate(location.state.from) : navigate("/");
     };

    return (
        <>
            <button type="button" onClick={onGoBack} className={ s.button}>Back</button>
            {recipe && <article className={s.container}>
            <h2 className={s.title}>Ingredients:</h2>
                {ingredients.ingredients.map(ingredient =>
                    <li key={ingredient.name} className={s.item}>
                        {ingredient.name} - {ingredient.amount.metric.value} {ingredient.amount.metric.unit}
                    </li>)}
            <h2 className={s.title}>How to cook:</h2>
            {recipe[0].steps.map(step => <li key={step.number} className={s.item}>{step.step}</li>)}
            </article>}
            
        </>    
)
}

export default Card;