import mealDataUtils from "./mealDataUtils.js";

let earliestTime = "2018-04-16T10:30:00.000Z";
let latestTime = "2018-04-16T19:30:00.000Z";

let testMeal = {
  meal: {
    datetime: "2018-04-16T11:30:00.000Z"
  },
  measurements: [
    {
      datetime: "2018-04-16T11:30:00.000Z"
    },
    {
      datetime: earliestTime
    }
  ],
  injections: [
    {
      datetime: latestTime
    }
  ]
};

it("returns the earliest time", () => {
  console.log("test hello!");
  var startTime = mealDataUtils.startTime(testMeal);
  expect(startTime).toBe(earliestTime);
});

it("returns the latest time", () => {
  console.log("test hello!");
  var endTime = mealDataUtils.endTime(testMeal);
  expect(endTime).toBe(latestTime);
});

it("returns the duration of the meal in mins", () => {
  console.log("test hello!");
  var duration = mealDataUtils.duration(testMeal);
  expect(duration).toBe(540);
});
