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
  }
};
