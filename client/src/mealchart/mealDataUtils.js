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
  if (meal.meal.carbs < lowReturn) {
    lowReturn = meal.meal.carbs;
  }
  meal.snacks.forEach(snack => {
    if (snack.carbs < lowReturn) {
      lowReturn = snack.carbs;
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
  exerciseAreas(meal) {
    //returns area data to show the exercise on the chart
    let mealStart = new Date(startTime(meal));
    let chartBottomValue = 0;
    let chartTopValue = 500;
    let areaData = [{ x: 0, y: chartBottomValue, y0: chartBottomValue }]; //the first point is the chart origin
    meal.exercises.forEach(exercise => {
      let startTime = new Date(exercise.start);
      let startDiffMs = startTime - mealStart;
      let startXmins = Math.floor(startDiffMs / 60000);
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

    return areaData;
  },
  snackAreas(meal) {
    let snackWidth = 10; //the width of the bar
    let mealStart = new Date(startTime(meal));
    let chartBottomValue = 0;
    let chartTopValue = 500;
    let areaData = [{ x: 0, y: chartBottomValue, y0: chartBottomValue }]; //the first point is the chart origin
    meal.snacks.forEach(snack => {
      let startTime = new Date(snack.datetime);
      let startDiffMs = startTime - mealStart;
      let startXmins = Math.floor(startDiffMs / 60000);
      let endXmins = startXmins + snackWidth;

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

    return areaData;
  },
  mealArea(meal) {
    let earliestTime = new Date(startTime(meal));
    let mealStart = new Date(meal.meal.datetime);
    let startXmins = 0;
    if (mealStart !== earliestTime) {
      //sometimes the meal is preceeded by something else
      let startDiffMs = mealStart - earliestTime;
      startXmins = Math.floor(startDiffMs / 60000);
    }
    let endXmins = startXmins + 20; //the width of the bar
    let chartBottomValue = 0;
    let chartTopValue = meal.meal.carbs;
    //the first point is the chart origin
    let areaData = [{ x: 0, y: chartBottomValue, y0: chartBottomValue }];
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

    return areaData;
  },
  insulinArea(meal, insulinI) {
    let injection = meal.injections[insulinI];
    //this creates the action curve
    let mealStart = new Date(startTime(meal));
    let insulinStart = new Date(injection.datetime);
    let startDiffMs = insulinStart - mealStart;
    let startXmins = Math.floor(startDiffMs / 60000);
    //insulin action curve hard coding for now... 4hrs?
    let areaData = [
      { x: startXmins, y: 0 },
      { x: startXmins + 20, y: 10 * injection.units },
      { x: startXmins + 60, y: 45 * injection.units },
      { x: startXmins + 90, y: 50 * injection.units },
      { x: startXmins + 120, y: 45 * injection.units },
      { x: startXmins + 180, y: 10 * injection.units },
      { x: startXmins + 360, y: 0 }
    ];
    return areaData;
  }
};
