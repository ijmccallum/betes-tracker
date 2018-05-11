function startTime(meal) {
  //returns the first time of any measurement / snack related to the meal
  let startTime = meal.meal.datetime;
  meal.measurements.forEach(measure => {
    if (measure.datetime < startTime) {
      startTime = measure.datetime;
    }
  });
  meal.injections.forEach(injection => {
    if (injection.datetime < startTime) {
      startTime = injection.datetime;
    }
  });
  return startTime;
}

function endTime(meal) {
  //returns the latest time of any measurement / snack related to the meal
  let endTime = meal.meal.datetime;
  meal.measurements.forEach(measure => {
    if (measure.datetime > endTime) {
      endTime = measure.datetime;
    }
  });
  meal.injections.forEach(injection => {
    if (injection.datetime > endTime) {
      endTime = injection.datetime;
    }
  });
  return endTime;
}

function lowestReading(meal) {
  let lowReturn = 1000;
  meal.measurements.forEach(measure => {
    if (measure.readingUS < lowReturn) {
      lowReturn = measure.readingUS;
    }
  });
  return lowReturn;
}

function highestReading(meal) {
  let highReturn = 0;
  meal.measurements.forEach(measure => {
    if (measure.readingUS > highReturn) {
      highReturn = measure.readingUS;
    }
  });
  return highReturn;
}

export default {
  startTime,
  endTime,
  duration: meal => {
    //returns the duration of the meal events in minutes
    var start = new Date(startTime(meal));
    var end = new Date(endTime(meal));
    var diffMs = end - start;
    var diffMins = Math.floor(diffMs / 60000);
    return diffMins;
  },
  highest: highestReading,
  lowest: lowestReading,
  measureScatter(meal) {
    //return an array of measurement x (mins from start of meal) & y (bloodsugar) values
    let mealStart = new Date(startTime(meal));
    let scatterData = meal.measurements.map(measure => {
      let measureTime = new Date(measure.datetime);
      let diffMs = measureTime - mealStart;
      let minsIntoMeal = Math.floor(diffMs / 60000);
      return {
        y: measure.readingUS,
        x: minsIntoMeal
      };
    });

    return scatterData;
  },
  exerciseArea(meal) {
    //returns area data to show the exercise on the chart
    let mealStart = new Date(startTime(meal));
    let chartBottomValue = 0;
    let chartTopValue = 500;
    let areaData = [{ x: 0, y: chartBottomValue, y0: chartBottomValue }]; //the first point is the chart origin
    meal.exercises.forEach(exercise => {
      let startTime = new Date(exercise.start);
      let startDiffMs = startTime - mealStart;
      let startXmins = Math.floor(startDiffMs / 60000);
      console.log("startXmins", startXmins);
      let endXmins = startXmins + exercise.duration;

      //starting bottom left point
      areaData.push({
        x: startXmins,
        y: chartBottomValue,
        y0: chartBottomValue
      });
      //starting top left point
      areaData.push({ x: startXmins, y: chartTopValue, y0: chartBottomValue });
      //end top right point
      areaData.push({ x: endXmins, y: chartTopValue, y0: chartBottomValue });
      //end bottom right point
      areaData.push({ x: endXmins, y: chartBottomValue, y0: chartBottomValue });
    });
    console.log("areaData", areaData);
    return areaData;
  }
};
