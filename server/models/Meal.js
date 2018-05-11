/**
 * Every meal event that happens.
 * can have multiple injections, but they're separate and reference the relevant meal
 * can have multiple excercises, ditto
 * can have multiple measurements, ditto
 */
var keystone = require("keystone");
var Types = keystone.Field.Types;

var Meal = new keystone.List("Meal");

Meal.add({
	title: { type: String, required: true, index: true, initial: true },
	carbs: { type: Number, initial: true },
	carbconfidence: {
		type: Types.Select,
		options: [
			{ value: 0.1, label: "Total guess" },
			{ value: 0.5, label: "fairly sure" },
			{ value: 1, label: "I measured it" }
		],
		initial: true
	},
	datetime: { type: Types.Datetime, default: Date.now, initial: true },
	user: {
		type: Types.Relationship,
		ref: "User",
		initial: true
	} /* May not be required */,
	public: {
		type: Boolean,
		initial: true
	} /* would make the meal publicly searchable by other users */,
	test: {
		type: String,
		initial: true
	}
});

Meal.relationship({
	path: "injections",
	ref: "Injection",
	refPath: "meal"
});

Meal.relationship({
	path: "exercises",
	ref: "Exercise",
	refPath: "meal"
});

Meal.relationship({
	path: "measurements",
	ref: "Measurement",
	refPath: "meal"
});

Meal.relationship({
	path: "snacks",
	ref: "Snack",
	refPath: "meal"
});

Meal.defaultColumns = "title";
Meal.register();
