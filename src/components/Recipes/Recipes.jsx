import { useState, useEffect } from "react";
import * as apiService from "../../APIservice";
import { Link, useLocation, useNavigate} from "react-router-dom";
 import s from "./Recipes.module.css"



const Recipes = () => { 

    const [recipes, setRecipes] = useState([]);
    const [inputText, setInputText] = useState("");
    const [query, setQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
   


    useEffect(() => {
        apiService.fetchRandomRecipes().then(setRecipes);
    }, []);
    console.log(recipes);

    useEffect(() => {
        if (query.trim() === "") {
            return;
        }
        apiService.fetchRecipeByKeyWord(query)
            .then(setRecipes);
    }, [query]);
    console.log(recipes);



    const handleNameChange = (e) => {
        setInputText(e.currentTarget.value.toLowerCase())
    };  
    
    const handleClick = (e) => {
        e.preventDefault();
        setQuery(inputText); 
        navigate({ ...location, search: `query=${inputText}` });
    }
    

     return (
         <>
             <input
                 type="text"
                 autoComplete="off"
                 autoFocus
                 onChange={handleNameChange}
                 className={s.input}
             ></input>
             <button type='submit' onClick={handleClick} className={s.button}>Search</button>

             {<ul className={s.list}>
                 {recipes && recipes.recipes ? recipes.recipes.map(recipe => <li key={recipe.id} className={s.item}>
                     <Link to={`/recipes/${recipe.id}`}  className={s.link}
                    state={{ from: location }}> {recipe.title} <img src={recipe.image} alt="img"></img></Link>
            </li>) : <h3 className={s.error}> Sorry! Something went wrong...</h3>}
             </ul>}
            
        </>
    )
}



   

export default Recipes;