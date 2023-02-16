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

### Copying `.env.example` to `.env` and updating if needed

```
cp .env.example .env
```
Notes 
* The default API port is 4000.
* If you need default preset data, set `USE_INITIAL_MOCK_DATA=true` in `.env` file. Take
into account that this data can be inconsistent. For example, the album with id 1 has an 
artist with id 5, but the artist with id 5 doesn't exist in the artists list.

Also, you can copy `.env.example` to `.env.local` with 
```dotenv
DATABASE_HOST=localhost
```

## Docker

### Prerequisites

You can configure the target of the application in the `.env` file to build docker for 
particular stage.

Development stage:
```bash
DOCKER_API_TARGET=api_development
```
Production stage:
```bash
DOCKER_API_TARGET=api_build
```
* See `Dockerfile` for more information.

Tests are included into the docker container to be able to run them there.

Some files and directories are excluded from the docker image to reduce its size.
See `.dockerignore` file for more information.


### Building and running

#### Building docker-compose

```bash
docker-compose build
```

#### Or build and run at the same time

```bash
docker-compose up --build
```

#### Running docker-compose

```bash
docker-compose up
```

If you want to go into container:
```bash
docker exec -it <container name> /bin/sh 
```

The database container name is `db` and you can go into it by typing:
```bash
docker exec -it db /bin/sh
```

The application container name is `api` and you can go into it by typing:
```bash
docker exec -it api /bin/sh 
```

#### Run prisma migrations

```bash
docker-compose run api npx prisma migrate dev --name init
```

#### Stopping docker-compose

```bash
docker-compose down
```

#### How create a docker image separately

```bash
docker build -t <image name> .
```

#### Scan docker images for vulnerabilities
Your system should be configured to run docker scan. For more information please visit
https://docs.docker.com/engine/scan/.

Docker scan is configured to run by npm. 

Scan api image:
```bash
npm run docker:scan:api
```

Scan db image:
```bash
npm run docker:scan:db
```

#### Uploading docker images to docker hub

Save the image by container ID:
```bash
docker container commit <container id> shautsou/nodejs2022q4
```

A new tag can be created by adding `:<tag>` to the end of the image name. For example:
```bash
docker image tag shautsou/nodejs2022q4 shautsou/nodejs2022q4:api
```

Then push the image to docker hub:
```bash
docker push shautsou/nodejs2022q4:api
```

#### Running tests in docker container

```bash
docker compose exec api npm run test
```

Or you can use npm command:
```bash
npm run docker:api:test
```

## Running application 


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
