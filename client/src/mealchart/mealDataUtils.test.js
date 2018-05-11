import mealDataUtils from "./mealDataUtils.js";

let earliestTime = "2018-04-16T10:30:00.000Z";
let latestTime = "2018-04-16T19:30:00.000Z";
let highestReading = 300;
let lowestReading = 30;

let testMeal = {
  meal: {
    datetime: "2018-04-16T11:30:00.000Z"
  },
  measurements: [
    {
      datetime: "2018-04-16T11:30:00.000Z",
      readingUS: highestReading
    },
    {
      datetime: earliestTime,
      readingUS: lowestReading
    }
  ],
  injections: [
    {
      datetime: latestTime
    }
  ]
};

it("returns the earliest time", () => {
  var startTime = mealDataUtils.startTime(testMeal);
  expect(startTime).toBe(earliestTime);
});

it("returns the latest time", () => {
  var endTime = mealDataUtils.endTime(testMeal);
  expect(endTime).toBe(latestTime);
});

it("returns the duration of the meal in mins", () => {
  var duration = mealDataUtils.duration(testMeal);
  expect(duration).toBe(540);
});

it("returns the highest reading", () => {
  var highest = mealDataUtils.highest(testMeal);
  expect(highest).toBe(highestReading);
});

it("returns the lowest reading", () => {
  var lowest = mealDataUtils.lowest(testMeal);
  expect(lowest).toBe(lowestReading);
});

it("returns the readings for a scatter plot correctly", () => {
  var scatterData = mealDataUtils.measureScatter(testMeal);
});
