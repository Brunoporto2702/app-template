## Description

This app is a template for implementing applications compliant with clean architecture and hexagonal architecture concepts.

## Architecture Concerns

The architecture of this application wsa strongly inspired in [Hexagonal architecture](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c), but slighly adapted to the context of the project. The resulting architecture schema can be found [here](https://drive.google.com/file/d/1i1Dqo_c9po73EM4eiuvt9cIZYN39ZvJR/view?usp=sharing). The main concern that drove the decision making of how to organize the application was to isolate the domain logic from implementation details as most as possible. 

It was developed using [Nest Framework](https://github.com/nestjs/nest) which also influenced deeply on the decisions made during development.

## Installation

```bash
$ npm install
```

## Running the app

Make sure you have [docker](https://docs.docker.com/engine/install/) installed on you machine. 

you can make sure it is correctly installed by running:

```bash
$ docker -v
```

In order to run the application on development (local) enviroment, you need to have at least the database running. You can do it by running:

```bash
$ docker compose up db -d
```

If you wish to run all the peripheral services run:

```bash
$ docker compose up -d
```

### Be aware that running all the services will consume a lot of resources from your machine. It is advised not to do so unless you intend to use use/test all the services. Otherwise, if you only want to develop the api, you can run only the database service.

The services included in the docker-compose file are:
- db: postgres database
- grafana: grafana service for monitoring
- prometheus: prometheus service for monitoring
- promtail: collect logs and send to loki
- loki: log aggregator

After the database is running, you can run the application by running:

```bash
# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test
```

## Migrations

```bash
# generate migtation
$ npm run migration:generate --name=desired_name

# applying migrations
$ npm run migration:run
```

## Format

```bash
# inspect formating errors
$ npm run format

# fix formating
$ npm run format:fix

```

## Lint

```bash
# inspect lint errors
$ npm run lint

# fix linting
$ npm run lint:fix

```

## run database for development using docker

```bash
$ docker-compose up -d
```

## Running on a docker container

```bash
# build docker image
$ docker build -t app .

# run docker container
docker run -p 3000:3000 -e DATABASE_URL=postgres://myuser:example@host.docker.internal:5432/app  app
```
