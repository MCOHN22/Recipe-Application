import React, {useEffect, useState} from 'react'; 
import Recipes from './components/Recipes';
import "./App.css";  

// API key provided by Edmamam

const App =() =>{
const APP_ID ="d8f737a3";

const APP_KEY="3019f8167f8627f3e07e28a6a2df6c79";

// Const created to help specific data points from the api appear and the search bar
const [recipe, setRecipes] = useState([]);
const [search, setSearch]= useState("");
const [query, setQuery] = useState("chicken");

//function used to call on the getRecipes API
useEffect(() =>{
  getRecipes();
}, [query]);
 
//Function for API  
const getRecipes= async () =>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  
  //translating the data with json 
  
  const data= await response.json(); 
  setRecipes(data.hits);
  console.log(data.hits);
}; 

//allows users to input different food names and different recipes appear
const updateSearch= e =>{
  setSearch(e.target.value);
  console.log(search); 

};

const getSearch= e => {
  e.preventDefault(); 
  setQuery(search);   
}

//function to return all data points referenced above and below these lines of code.
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipe.map( recipe =>(
        <Recipes
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
    </div>
  )
}

export default App;


