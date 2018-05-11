/**
 * When you exercise, create a new Exercise, it gets linked to a meal!
 */

var keystone = require("keystone");
var Types = keystone.Field.Types;

var Exercise = new keystone.List("Exercise");

Exercise.add({
	title: { type: String, required: true, index: true, initial: true },
	start: { type: Types.Datetime, default: Date.now, initial: true },
	duration: { type: Number, initial: true },
	intensity: { type: Number, initial: true },
	meal: { type: Types.Relationship, ref: "Meal", initial: true }
});

Exercise.defaultColumns = "title";
Exercise.register();
