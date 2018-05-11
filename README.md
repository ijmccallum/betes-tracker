# Betes Tracker

* database is mongoDB. run `docker-compose up` from the repo root
* Server is built with KeystoneJS. run `npm start` from the server dir
* Client is built with create-react-app. run `npm start` from the client dir

## Running

* docker compose file runs a container with the DB, so start that first. (cd ~/Projects/betes-tracker)
* npm start spins up a node server locally (on the host machine) that talks to the docker db container.

## TODOs

* [ ] one repo!
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

## Goal

When I sit down for a meal I want to pull up this app and look at previous occasions I've had said meal or similar in order to judge how much insulin to take. I'll need to see a mini timeline for each meal showing bloodsugar, insulin injections, exercise, and snacks.

Bonus things would be:

* show a rough insulin action curve. Based on a manual input for the curve then checked against actual experience.
* have the app give recommendations (if this ever goes public yeay it'll need a disclaimer!)
* import data from various devices / sync with devices / sync with data found on a computer that's hooked up to some kind of device - for blood sugar monitoring & or exercise things like a fitbit.
* data on different types of food - carbs / glycemic index / a list of meals you've had with this food in it... maybe.

## Userstories

* I'm sitting down for a meal that I've never had before. I'll have a quick search to see if it exists, then I'll add a new meal. I'll add an insulin amount & time. I'll add some kind of exercise. I'll add some more insulin. I'll add more exercise. After a few hours the meal may have worn off (finished digesting) but I'll have forgotten to complete it in the app, so I should probably be asked by the app if I feel it's finished. Then I can say yes or - probably won't be for another n hours.
* I'm sitting down for a meal I have had before. I'll have a quick search to see if it exists. It does! I'll add another instance on that meal then enter data as in the previous US.
* I'm sitting down for a meal that is similar to one I've had before. I'll have a quick search to see if there are any meals like this one, I may find one or two. I'll tag them as relevant for this new meal. Then I'll go through the same steps as before for adding data, but with easy access / view of the similar meals to help inform my decisions.
