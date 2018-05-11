/**
 * When you inject, create a new injection, it gets linked to a meal!
 */
var keystone = require("keystone");
var Types = keystone.Field.Types;

var Injection = new keystone.List("Injection", {
	drilldown: "meal"
});

Injection.add({
	datetime: { type: Types.Datetime, default: Date.now, initial: true },
	units: { type: Number, initial: true },
	meal: { type: Types.Relationship, ref: "Meal", initial: true }
});

Injection.defaultColumns = "title";
Injection.register();
