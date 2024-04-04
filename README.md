# Givebutter Frontend Take-home

## Overview

Our goal is to fix and enhance a Pokedex application. If you are unfamiliar with the world of Pokemon, here is a brief explanation:

> The Pokedex is an electronic device created and designed to catalog and provide information regarding the various species of Pokemon featured in the Pokemon video game, anime and manga series.

[Source](https://pokemon.fandom.com/wiki/Pokedex)

Our version of the Pokedex is able to list and search through Pokemon. However, our search is a bit buggy. Additionally, we want to add a feature that shows a selected Pokemon's details like its **type**, **moves**, and **evolution chain**.

Your time is valuable, and we are extremely appreciative of you participating in this assessment. We're looking to gauge your ability to read and edit code, understand instructions, and deliver features, just as you would during your typical day-to-day work. We expect this test to take no more than one to two hours and ask to complete this work within the next two days. Upon submit, we will review and provide feedback to you regardless of our decision to continue the process.

Please update and add code in `App.js` and `index.css` based on the requirements found below. Additionally, we ask you to edit the `readme.md` with answers to a few questions found in the `Follow-up Questions` section also found below.

When you are finished, please upload your completed work to your Github and invite `@gperl27` to view it. **Do not open a PR please.**

## Setup

- This repo was scaffolded using `create-react-app`. As such, this app requires a stable version of `node` to get up and running.
- Clone this repo and run `npm install`.
- To run the app, run `npm start`.
- Please reach out to the Givebutter team if you have any issues with the initial setup or have any problems when running the initial app.

## Requirements

### Search
- Typing in the search input should filter the existing Pokemon list and render only matches found
- Fix any bugs that prevent the search functionality from working correctly
- If there are no results from search, render "No Results Found"
- The search results container should be scrollable
- The UI should match the below mockup

![](mockup0.png)

### Details Card

- Clicking "Get Details" for any given Pokemon should render a card that has the Pokemon's `name`, `types`, `moves`, and `evolution chain`
- Use the api functions defined in `api.js` to retrieve this data. Adding new endpoints or editing existing ones are out of scope
- The details card should match the below mockup

![](mockup1.png)

## Follow-up Questions

Please take some time to answer the following questions. Your answers should go directly in this `readme`.

- Given more time, what would you suggest for improving the performance of this app?

  Given more time, to improve the performance of this app, I would suggest caching the responses from the API calls.

  One way to do this would be to cache the data in local storage. If we can assume that the response will not change often, caching the fetchAllPokemon data in local storage, then retrieving it on subsequent page loads is a good option. To ensure that we are not presenting stale data, we would need a way to make sure the data is accurate and up to date.

  Another way would be to use a library such as react-query, which is designed for managing server state data. It comes with caching features, knowing when data is stale, updating stale data in the background, and more. React-query easily manages cached data through the concept of unique query keys. We could not only cache the response of fetchAllPokemon, but also the responses of getting the details of the pokemon as well - all easily retrievable through the library's cache.

- Is there anything you would consider doing if we were to go live with this app?

  Ideally before starting the implementation, I would work with the designer and PM on the team to make sure we're all on the same page. I would go through the use cases and see if there are any flows I haven't covered.

  To align with mobile-first design, I would discuss with the designer how the experience should be for smaller screen sizes. I would have loved to start the css with mobile-first as the foundation.

  I would also complete more accessibility checks - making sure the app is usable for both keyboard-only and screen reader users.

  I would definitely add testing, both unit and automation tests. It's important to have confidence on the code quality and test for "happy path", corner cases, and error flows.

  In addition, I would create a release plan with questions like:
  - How will we monitor the usage of the app?
  - What kinds of alerts should be set up for failures?
  - Are there any interactions that we want to track for analytics?

- What was the most challenging aspect of this work for you (if at all)?

  The most challenging aspect was writing the correct logic to get the evolution chain. I think the logic I have can be improved and would like to know what suggestions are to make it better!
