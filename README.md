# Home Library Service

## Description
A NestJS RESTful API service for home library with CRUD operations for tracks, albums, artists and favorites.
It uses Docker, PostgreSQL, Prisma, Swagger, Jest, ESLint, Prettier, Lint-Staged.

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Getting Started

### Download the project

```
git clone git@github.com:Sanhe/nodejs2022Q4-service.git
```

### Go to the project directory

```
cd nodejs2022Q4-service
```

### Switch to the appropriate branch `feature/containerization-database-orm`

```
git checkout feature/containerization-database-orm
```

### Copy `.env.example` to `.env` and update it if needed

```
cp .env.example .env
```
Notes 
* The default API port is 4000.
* The default database port is 5432.

### Make install

```
npm install
```


## Running the app

After starting the app on port (4000 as default and can be changed in `.env` file on `PORT` variable) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.


### Prerequisites

You can configure the target of the application in the `.env` file to build docker for 
particular stage.

Development stage:
```bash
DOCKER_API_TARGET=api_development
```
Production stage:
```bash
DOCKER_API_TARGET=api_production
```

* See `Dockerfile` for more information.

Tests are included into the docker container to be able to run them inside.

Some files and directories are excluded from the docker image to reduce its size.
See `.dockerignore` file for more information.


### Building and running

#### Build and run docker-compose

```bash
docker-compose up --build
```

#### Run prisma migrations

```bash
npm run docker:api:migrate
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

*Note:* Fixing vulnerabilities in the api image is out of the scope.

#### Running tests in docker container

```bash
docker-compose exec api npm run test
```

Or you can use npm command:
```bash
npm run docker:api:test
```

### Other useful commands

#### Build docker-compose

```bash
docker-compose build
```

#### Running docker-compose

```bash
docker-compose up
```

#### Build and run at the same time

```bash
docker-compose up --build
```

If you want to go into container:
```bash
docker exec -it <container name> /bin/sh 
```

The database container name is `db` and you can go into it by the next command:
```bash
docker exec -it db /bin/sh
```

The application container name is `api` and you can go into it by the next command:
```bash
docker exec -it api /bin/sh 
```

#### Stopping docker-compose

If you want to stop docker containers:

```bash
docker-compose down
```

#### How create a docker image separately

```bash
docker build -t <image name> .
```

#### Uploading docker images to docker hub

Save the image by container ID:
```bash
docker container commit <container id> <image name>
```

I.e.:
```bash
docker container commit api shautsou/nodejs2022q4-api
```

A new tag can be created by adding `:<tag>` to the end of the image name. For example, to create a tag called `last`:
```bash
docker image tag shautsou/nodejs2022q4-api shautsou/nodejs2022q4-api:last
```

Then push the image to docker hub:
```bash
docker push shautsou/nodejs2022q4-api
```

*Note:* The same is for the database image, i.e. `shautsou/nodejs2022q4-db`.

#### Running docker-compose in `production` mode

Change the `DOCKER_API_TARGET` variable in `.env` file to `api_production` and run:

```bash
docker-compose up --build
```

*Note:* It's not possible to run tests in `production` mode.


#### Show docker images with their sizes

```bash
docker-compose images
```

*Note:* The requirement to have final image size less than 500MB is met by production image. 
So use `production` mode to run the application (and make sure to clean up previous images before building).
Also, it is possible to use remote images so just comment out `build` section in `docker-compose.yml` file.
Tests don't work in `production` mode.




## Testing

After application running by docker in `development` mode open new terminal and enter:

```bash
docker-compose exec api npm run test
```

Or you can use npm command:
```bash
npm run docker:api:test
```

## Lint

*Note:* Linting is configured to run in `development` mode only.

### Check

```
npm run lint
```

Or in docker container:
```
npm run docker:api:lint
```
