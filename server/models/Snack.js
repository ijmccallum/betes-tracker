/**
 * The snacks / sugars taken to boost bloodsugar, yum!
 * Anything after the main meal and before that meal has finished really
 */

var keystone = require("keystone");
var Types = keystone.Field.Types;

var Snack = new keystone.List("Snack");

Snack.add({
	title: { type: String, required: true, index: true, initial: true },
	carbs: { type: Number, initial: true },
	datetime: { type: Types.Datetime, default: Date.now, initial: true },
	meal: { type: Types.Relationship, ref: "Meal", initial: true }
});

Snack.defaultColumns = "title";
Snack.register();
