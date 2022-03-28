# Expense Tracker App
This small little app was put together for a Dynamicly tech assessment. It was put together using `create-react-app typescript` for the client side, along with Node.js/MongoDB (using Express, Mongoose) on the server side. Node.js version is `17.8.0`

If Node Version is an issue, suggest using `nvm` as a means to quickly switch over.

# Running the App
The app can be run through 2 terminals (I prefer to keep these to different terminals so that Client and Server can be debugged independently).
- Client side --> `cd` into `client` directory, install packages with `npm i`, and run with `npm start` --> Will kick up client React app on port `3000`
- Server side --> `cd` into `server` direction, install packages with `npm i`, and run with `npm start` --> Will kick up server side app on port `5000`

# Assumptions
A few assumptions about the project were made and are listed below.
- Assumed that the `date` field on Expense was the Date of item creation and not item creation/edit (IE this field never changes post creation)
- A UI Library (AntD) was used for out of the box styling and component creation
- Axios was used as a Client side means of dispatching requests to the backend
- Token or extra Authorization for calls made to the backend/MongoDB cluster were not added but would be a NECESSITY for anything live
- Redux dev tools were added for ease of testing
- No production environment was made to distinguish from a dev environment

# Brief Post-Mortem
So I hadn't actually built a from-scratch MERN app before (regardless of size) and this was an elightening experience. The MERN stack that I work in, is-- at least in comparison-- far more of a JavaScript based React app with a little TypeScript sprinkled in. To be fair, I was aware of that, just not to the extent of its impact in other places of the app --> Redux namely.

For this assement, I ran into TS issues using the Redux pattern that I was familiar with (as seen from some of the commit history) only to realize that the `slice` pattern is the more TypeScript way of doing things (We still use Action classes and handlers). Another first was the inclusion of async Redux actions using Thunk. That is just SO MUCH NICER in comparison to performing an async fetch call and then updating things via a standard dispatch on Promise return. Doing it all in one place = `Chef kiss`.

# Non Implementations
There are a few non-implementations that I would like to make note of:
- No components are memoized --> While this would for sure make a less "re-rendery" application, the size of this application, would probably be more expensive to Memoize. However in a live, prod, environment, Memoization of components would probably be worth extra cost. 

# Known Issues
There is a known issue, it does not affect core functionality:
- There is a console warning about a deprecated findDOM usage present when clicking the the `Add Expense` modal