# Betes Tracker!

Essentially - a good excuse for a project to try out new tech :)

## Goal

When I sit down for a meal, I want to pull up this app and look at previous occasions I've had this meal or similar and judge how much insulin is needed based on that history. I'll need to see a timeline for each meal showing bloodsugar, insulin injections (yep multiple), and exercise varying over time.

Bonus things would be:

* show a rough insulin action curve. Based on a manual input for the curve then checked against actual experience.
* have the app give recommendations (if this ever goes public yeay it'll need a disclaimer!)
* import data from various devices / sync with devices / sync with data found on a computer that's hooked up to some kind of device - for blood sugar monitoring & or exercise things like a fitbit.
* data on different types of food - carbs / glycemic index / a list of meals you've had with this food in it... maybe.

## Userstories

* I'm sitting down for a meal that I've never had before. I'll have a quick search to see if it exists, then I'll add a new meal. I'll add an insulin amount & time. I'll add some kind of exercise. I'll add some more insulin. I'll add more exercise. After a few hours the meal may have worn off (finished digesting) but I'll have forgotten to complete it in the app, so I should probably be asked by the app if I feel it's finished. Then I can say yes or - probably won't be for another n hours.
* I'm sitting down for a meal I have had before. I'll have a quick search to see if it exists. It does! I'll add another instance on that meal then enter data as in the previous US.
* I'm sitting down for a meal that is similar to one I've had before. I'll have a quick search to see if there are any meals like this one, I may find one or two. I'll tag them as relevant for this new meal. Then I'll go through the same steps as before for adding data, but with easy access / view of the similar meals to help inform my decisions.

## Tech choices!

_Ohh this is the fun bit!_

**Goals**

* Server and client talk to each other through GraphQL.
* GraphQL server set up as some kind of boilerplate with logging in and authentication already set up.
* Fancy single page app with server side rendering and service workers built into the boilerplate. Work offline & on phones!
* Quick CSS lib for faster prototyping - hello Tachyons!

**Bonuses**

* Some kind of DevOps set up boilerplate with CI/CD
* live error monitoring? (that's free!)
* code styleguide / enforcement through prettier - built into the CI
* A11y testing & built into the CI

**Options**
* Firebase
* GitLab
