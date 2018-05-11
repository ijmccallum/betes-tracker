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
	console.log("related data: ", relData);

	return relData;
}

exports.list = async function(req, res) {
	//this will be the returned list of meals
	let mealData = [];
	//get a list of meals
	let meals = await Meal.model
		.find()
		.populate("user")
		.exec();

	for (let m = 0; m < meals.length; m++) {
		mealData.push({
			meal: meals[m],
			measurements: await getRelatedData(meals[m].id, Measurement),
			injections: await getRelatedData(meals[m].id, Injection),
			snacks: await getRelatedData(meals[m].id, Snack),
			exercises: await getRelatedData(meals[m].id, Exercise)
		});
	}

	res.json({
		meals: mealData
	});
};

exports.get = async function(req, res) {
	let meal = await Meal.model.findById(req.params.id).exec();

	res.json({
		meal: meal
	});
};

//TODO: test and async this
// https://auth0.com/blog/developing-web-apps-and-restful-apis-with-keystonejs/
exports.create = function(req, res) {
	var item = new Meal.model(),
		data = req.method == "POST" ? req.body : req.query;

	item.getUpdateHandler(req).process(data, function(err) {
		if (err) return res.json({ error: err });

		res.json({
			people: item
		});
	});
};

exports.update = function(req, res) {
	res.json({
		todo: "this"
	});
};

exports.remove = function(req, res) {
	res.json({
		todo: "this"
	});
};
