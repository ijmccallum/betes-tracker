var keystone = require("keystone");
var Meal = keystone.list("Meal");
var Measurement = keystone.list("Measurement");
var Snack = keystone.list("Snack");
var Injection = keystone.list("Injection");
var Exercise = keystone.list("Exercise");

async function getRelatedData(id, Model) {
	var relData = await Model.model
		.find()
		.where("meal", id)
		.exec();

	return relData;
}

exports = module.exports = async function(req, res) {
	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = "meals";

	//get a list of meals
	locals.meals = await Meal.model
		.find()
		.populate("user")
		.exec();

	//for each meal, get the extra details:
	for (let meal of locals.meals) {
		meal.measurements = await getRelatedData(meal.id, Measurement);
		meal.injections = await getRelatedData(meal.id, Injection);
		meal.snacks = await getRelatedData(meal.id, Snack);
		meal.exercises = await getRelatedData(meal.id, Exercise);
	}

	// Render the view
	view.render("meals");
};
