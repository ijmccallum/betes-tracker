/**
 * When you measure, create a new Measurement, it gets linked to a meal!
 */
var keystone = require("keystone");
var Types = keystone.Field.Types;

var Measurement = new keystone.List("Measurement");

Measurement.add({
	readingUS: { type: Number, initial: true },
	readingUK: { type: Number, initial: true },
	datetime: { type: Types.Datetime, default: Date.now, initial: true },
	meal: { type: Types.Relationship, ref: "Meal", initial: true }
});

Measurement.defaultColumns = "title";
Measurement.register();
