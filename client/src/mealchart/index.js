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
    let mealDate = new Date(this.props.mealData.meal.datetime);
    let mealDateString = mealDate.toLocaleTimeString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
    return (
      <div className="MealChart">
        <p className="f6 tc sans-serif ma0">
          {this.props.mealData.meal.title}
          <br />
          {mealDateString}
        </p>
        <VictoryChart
          domain={{
            x: [0, mealDataUtils.duration(this.props.mealData) + 10],
            y: [lowestChartValue, highestChartValue]
          }}
          padding={{ top: 0, bottom: 50, left: 50, right: 50 }}
        >
          {/* time markers */}
          <VictoryAxis
            width={mealDataUtils.duration(this.props.mealData) + 10}
            domain={[0, mealDataUtils.duration(this.props.mealData)]}
            label="Minutes after meal"
            standalone={false}
            style={{
              tickLabels: { fontSize: 10, padding: 5 },
              axisLabel: { fontSize: 10 }
            }}
          />
          {/* blood sugar axis */}
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
          {/* carbs axis */}
          <VictoryAxis
            dependentAxis
            // width={mealDataUtils.duration(this.props.mealData)}
            // height={200}
            domain={[0, 200]}
            orientation="right"
            // offsetY="0"
            label="Carbs"
            style={{
              axisLabel: { fontSize: 10, fill: "#229954" },
              tickLabels: { fontSize: 10, fill: "#229954", padding: 5 }
            }}
            standalone={true}
          />
          {/* low line */}
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
          {/* high line */}
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
          {/* stacking inslin action curves */}
          <InsulinChart
            mealData={this.props.mealData}
            height={highestChartValue - lowestChartValue}
            width={mealDataUtils.duration(this.props.mealData)}
            chartDomain={{
              x: [0, mealDataUtils.duration(this.props.mealData)],
              y: [0, highestChartValue]
            }}
          />
          {/* the meal */}
          <VictoryArea
            style={{ data: { fill: "#229954", opacity: "0.8" } }}
            data={mealDataUtils.mealArea(this.props.mealData)}
            domain={{
              x: [0, mealDataUtils.duration(this.props.mealData) + 10],
              y: [0, 200]
            }}
            standalone
          />
          {/* snack bars, using area to be more accurate time wise */}
          <VictoryArea
            style={{ data: { fill: "#229954", opacity: "0.5" } }}
            data={mealDataUtils.snackAreas(this.props.mealData)}
          />
          {/* exercise, also using areas to be accurate */}
          <VictoryArea
            style={{ data: { fill: "#E74C3C", opacity: "0.5" } }}
            data={mealDataUtils.exerciseAreas(this.props.mealData)}
          />
          {/* Blood sugar measurements */}
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
