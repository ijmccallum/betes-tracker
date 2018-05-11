# The API!

Keystone!

This is essentially a prototype. So keep it mini!

## Running

* docker compose file runs a container with the DB, so start that first. (cd ~/Projects/betes-tracker-api)
* npm start spins up a node server locally (on the host machine) that talks to the docker db container.

## TODOs

* [x] check if meals added are automatically linked to the current user (doesn't look like it)
* [x] enter some meal data
* [ ] when relating different types of data together (eg linking an injection to a meal, show the item's tile instead of the ID)
* set up a search page - a new auth page (in the admin?)
  * search by text
  * filter by exercise
  * show results in text form
* create meal data visualisation component (mealvis) to apply to the search results

With those things done I should be able to search for a previously entered meal and use it to judge what to do. Next up will be adding meal & related data while seeing the relevant other meals

* Add a meal creation component in the search page
  * enter meal data
  * automatically linked to the current user (is this required?)
  * add Injection data (multiple) linked to the current meal
  * add Exercise data (multiple) linked to the current meal
  * add snack data (multiple) linked to the current meal
  * add Measurement data (multiple) linked to the current meal

Now I should be able to search for relevant meals, view them, and enter a new meal at the same time. Next up will be to get this thing public!

* Deploy to Heroku because there's already a proc file :P (maybe)
