import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./tachyons.css";
import registerServiceWorker from "./registerServiceWorker";

import MealChart from "./mealchart";

//Get the meal data
//for each meal, render a MealChart

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      meals: []
    };
  }
  componentDidMount() {
    console.log("calling api");
    fetch("http://localhost:3000/api/meals/")
      .then(res => res.json())
      .then(
        result => {
          console.log("got meals: ", result);
          this.setState({
            isLoaded: true,
            meals: result.meals
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }
  render() {
    return (
      <ul className="list flex flex-wrap">
        {this.state.meals.map(function(meal, i) {
          return (
            <li key={i} className="w6 pa3 mr2">
              <MealChart mealData={meal} />
            </li>
          );
        })}
      </ul>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
