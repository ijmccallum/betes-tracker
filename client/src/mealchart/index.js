import React, { Component } from "react";

/**
 * The MealChart component
 * Takes meal data, renders a chart!
 */

class MealChart extends Component {
  //y axis 30 to 300
  //x axis start time to end time
  render() {
    return (
      <div className="MealChart">
        <h2>{this.props.mealData.meal.title}</h2>
        <svg />
      </div>
    );
  }
}

export default MealChart;
