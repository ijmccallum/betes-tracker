import React, { Component } from "react";
import { VictoryStack, VictoryArea } from "victory";
import mealDataUtils from "./mealDataUtils.js";

/**
 * The InsulinChart component
 * Shows insulin stacking!
 */

class InsulinChart extends Component {
  render() {
    let areas = [];
    for (var i = 0; i < this.props.mealData.injections.length; i++) {
      areas.push(
        <VictoryArea
          key={i + 1}
          data={mealDataUtils.insulinArea(this.props.mealData, i)}
          style={{
            data: {
              fill: "#E74C3C",
              fillOpacity: 0.1,
              stroke: "#E74C3C",
              strokeWidth: 1
            }
          }}
        />
      );
    }
    return (
      <VictoryStack
        standalone={false}
        // height={this.props.height}
        // width={this.props.width}
        domain={this.props.chartDomain}
      >
        {areas}
      </VictoryStack>
    );
  }
}

export default InsulinChart;
