import React, { Component } from "react";

/**
 * The MealChart component
 * Takes meal data, renders a chart!
 */

class MealChart extends Component {
  render() {
    return (
      <div className="MealChart">
        <h2>{this.props.mealData.meal.title}</h2>
      </div>
    );
  }
}

export default MealChart;
