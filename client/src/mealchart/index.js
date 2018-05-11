import React, { Component } from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryArea,
  VictoryLine
} from "victory";
import mealDataUtils from "./mealDataUtils.js";

/**
 * The MealChart component
 * Takes meal data, renders a chart!
 */

class MealChart extends Component {
  render() {
    let lowestChartValue = 60;
    let lowestReading = mealDataUtils.lowest(this.props.mealData);
    if (lowestReading < lowestChartValue) {
      lowestChartValue = lowestReading - 10;
    }
    let highestChartValue = 150;
    let highestReading = mealDataUtils.highest(this.props.mealData);
    if (highestReading > highestChartValue) {
      highestChartValue = highestReading + 10;
    }
    return (
      <div className="MealChart">
        <h2>{this.props.mealData.meal.title}</h2>
        <VictoryChart
          domain={{
            x: [0, mealDataUtils.duration(this.props.mealData)],
            y: [lowestChartValue, highestChartValue]
          }}
        >
          {/* snacks */}
          {/* exercise */}
          <VictoryArea
            style={{ data: { fill: "#c43a31", opacity: "0.5" } }}
            data={mealDataUtils.exerciseArea(this.props.mealData)}
          />
          {/* recommended area lines - TODO: make this a shaded area? */}
          <VictoryLine
            data={[
              { x: 0, y: 70 },
              { x: mealDataUtils.duration(this.props.mealData), y: 70 }
            ]}
          />
          <VictoryLine
            data={[
              { x: 0, y: 140 },
              { x: mealDataUtils.duration(this.props.mealData), y: 140 }
            ]}
          />
          <VictoryScatter
            data={mealDataUtils.measureScatter(this.props.mealData)}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default MealChart;
