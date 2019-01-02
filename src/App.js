import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import Recipes from './components/Recipes';

const API_KEY = 'a727103aa2daab262c3918e2d0c070e5';
// https://www.food2fork.com/api/search?key=YOUR_API_KEY&q=chicken%20breast&page=2

class App extends Component {

  state = {
    recipes: []
  };
 
  getRecipe = async (e) => {
    
    const recipeName = e.target.elements.recipeName.value;

    e.preventDefault();

    const api_call = await fetch (`
    https://www.food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&page=2`);

    const data = await api_call.json();
    
    this.setState({ recipes: data.recipes });
    console.log(this.state.recipes);  
  }
  componentDidMount = () => {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({ recipes }); 
  }
  componentDidUpdate = () => {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        <Recipes recipes={this.state.recipes} />
      </div>
    );
  }
}

export default App;