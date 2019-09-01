## Features
1. Header with animation. Infinite animation on home page. On other pages animation works while the data from GraphQL endpoint is being loaded
2. Search bar
3. Countries list uses [react-window](https://github.com/bvaughn/react-window) for rendering
4. After you click on a country we save it in the localStorage and then show on the home page as "Recently viewed"
5. When you go to URL /countries/:code by yourself the list of countries on the left will be automaticly scrolled to the country that you are checking right now
6. Live demo on [Zeit Now](https://front-end-nzhpilpijd.now.sh/)
7. Hooks are everywhere (and emojis 🥶)

# Front-end task of Code Challenge for Scoutbase

This task is for demonstrating your understanding of HTML, CSS, Javascript, React & related libraries.

If you’re doing the front-end only, you must use the https://countries.trevorblades.com endpoint for GraphQL API.

Preferred libraries:
  1. `styled-components` for styling
  2. `apollo-client` for consuming GraphQL API
  3. `react-router` or any alternative to implement routing

Instructions:

1. Create a `create-react-app` repo.
2. Add a router with routes:
  - `/` - for displaying basic links for the other routes
  - `/countries` - for requesting GraphQL API and rendering the list
  - `/countries/(:code)` - for requesting GraphQL API and rendering the properties of a continent
3. Design is totally by you.
4. Countries list at `/countries` must contain the list of countries and the languages spoken in that country. Both in English and native languages. It should also contain the continent it is located in.
5. `/countries/(:code)` must render the currency and a area code (phone) of that country.
6. Routes must be fully loadable with a direct link. `/countries/CI` must render the page for Ivory Coast, for example.
7. End.
