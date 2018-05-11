import React, { Component } from "react";
import { VictoryChart, VictoryScatter } from "victory";
import mealDataUtils from "./mealDataUtils.js";

/**
 * The MealChart component
 * Takes meal data, renders a chart!
 */

class MealChart extends Component {
  render() {
    return (
      <div className="MealChart">
        <h2>{this.props.mealData.meal.title}</h2>
        <VictoryChart
          domain={{
            x: [0, mealDataUtils.duration(this.props.mealData)],
            y: [
              mealDataUtils.lowest(this.props.mealData) - 10,
              mealDataUtils.highest(this.props.mealData) + 10
            ]
          }}
        >
          <VictoryScatter
            data={mealDataUtils.measureScatter(this.props.mealData)}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default MealChart;
