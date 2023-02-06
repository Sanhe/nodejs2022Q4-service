# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Getting Started

### Downloading

```
git clone git@github.com:Sanhe/nodejs2022Q4-service.git
```

### Switching to dev branch `feature/rest-service`

```
git checkout feature/rest-service
```

### Installing NPM modules

```
npm install
```

### Copying `.env.example` to `.env` and updating the API port value if needed

```
cp .env.example .env
```
Notes 
* The default API port is 4000.
* If you need default preset data, set `USE_INITIAL_MOCK_DATA=true` in `.env` file. Take
into account that this data can be inconsistent. For example, the album with id 1 has an 
artist with id 5, but the artist with id 5 doesn't exist in the artists list.


## Running application

```
npm start
```

After starting the app on port (4000 as default and can be changed in `.env` file on `PORT` variable) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Notes

* There is no validation if a track, album or artist already added to the favorites. So we
have 201 Created response even if the element already exists in favorites.


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
