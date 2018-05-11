import React, { Component } from "react";
import {
  VictoryChart,
  VictoryScatter,
  VictoryArea,
  VictoryLine,
  VictoryAxis
} from "victory";
import mealDataUtils from "./mealDataUtils.js";
import InsulinChart from "./insulinChart.js";

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
        <p>{this.props.mealData.meal.title}</p>
        <VictoryChart
          domain={{
            x: [0, mealDataUtils.duration(this.props.mealData) + 10],
            y: [lowestChartValue, highestChartValue]
          }}
        >
          {/* time */}
          <VictoryAxis
            width={mealDataUtils.duration(this.props.mealData) + 10}
            domain={[0, mealDataUtils.duration(this.props.mealData)]}
            label="Time"
            standalone={false}
            style={{
              tickLabels: { fontSize: 10, padding: 5 },
              axisLabel: { fontSize: 10 }
            }}
          />
          {/* blood sugar */}
          <VictoryAxis
            crossAxis
            dependentAxis
            width={mealDataUtils.duration(this.props.mealData)}
            domain={[lowestChartValue, highestChartValue]}
            standalone={false}
            label="Blood Sugar"
            style={{
              grid: { stroke: "grey", opacity: 0.5 },
              axisLabel: { fontSize: 10 },
              tickLabels: { fontSize: 10, padding: 5 }
            }}
          />
          {/* carbs */}
          <VictoryAxis
            dependentAxis
            // width={mealDataUtils.duration(this.props.mealData)}
            height="200"
            domain={[0, 200]}
            orientation="right"
            // offsetY="0"
            label="Carbs"
            style={{
              axisLabel: { fontSize: 10 },
              tickLabels: { fontSize: 10, fill: "#229954", padding: 5 }
            }}
            standalone={true}
          />
          <InsulinChart
            mealData={this.props.mealData}
            height={highestChartValue - lowestChartValue}
            width={mealDataUtils.duration(this.props.mealData)}
            chartDomain={{
              x: [0, mealDataUtils.duration(this.props.mealData)],
              y: [0, highestChartValue]
            }}
          />
          {/* snacks */}
          <VictoryArea
            style={{ data: { fill: "#229954", opacity: "0.5" } }}
            data={mealDataUtils.snackAreas(this.props.mealData)}
          />
          {/* exercise */}
          <VictoryArea
            style={{ data: { fill: "#E74C3C", opacity: "0.5" } }}
            data={mealDataUtils.exerciseAreas(this.props.mealData)}
          />
          {/* recommended area lines - TODO: make this a shaded area? */}
          <VictoryLine
            data={[
              { x: 0, y: 70 },
              { x: mealDataUtils.duration(this.props.mealData) + 10, y: 70 }
            ]}
            style={{
              data: {
                stroke: "#000000",
                strokeWidth: 1
              }
            }}
          />
          <VictoryLine
            data={[
              { x: 0, y: 140 },
              { x: mealDataUtils.duration(this.props.mealData) + 10, y: 140 }
            ]}
            style={{
              data: {
                stroke: "#000000",
                strokeWidth: 1
              }
            }}
          />
          <VictoryScatter
            data={mealDataUtils.measureScatter(this.props.mealData)}
            labels={datum => `${datum.y}`}
            style={{
              labels: {
                fontSize: 8,
                padding: 3,
                fill: "#000000",
                offsetX: 5
              }
            }}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default MealChart;
