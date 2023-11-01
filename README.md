## Description

This app is a template for for people that want to experiment with their own projects and learn throughout that process.

## Audience: For whom is this repository made to?

Anyone that intends to learn by getting their hands dirty would havea great time playing around with the resources here provided. There is two groups of people that would benefit the most though:

1. Early stage developers that want to better understand the best practices of software development, mantinability, and collaboration used by the greatest companies out there.
2. People who work/worked on great projects for the majority of their lifes, and want to get a more pratical understanding of how things ended up the way they are. It is not unusual that employees of enormous projects gets a little intimidated by the amount of tools and resources used by those companies. Hopefully, playing around with this project may help you grasp some valuable insights of why and/or how stuff gets done.

## Who is the owner of this project?

This repository is made **by** the community **for** the community. It does not intend to serve as a source of truth, official guideline or any anything related that. It is instead a place for shared experimentation and collaboration that everyone who interacts with it wither beneffits itself or improve existing content. Ideally both!

## How can I use this template?

1. Navigate and explore: first thing you want to do is messing around and try to identify architecture concerns that guided the development. What is good and what isn't so much (please do point it out as an issue!)? You will certaily find both situations and that leads us to the next two steps of this brief interaction guideline. It is strongly recomended that you read the features and characteristics section before heading down to this part (add link to it afterwards).
2. Clone the repository and play around with the funcionalities: there are plenty of functionalities and resources configured out of the box on this template that you can experiment with. Go ahead and follow the **Technical use instructions** (*add link) in order to get going!
3. Refer to the issues (*link) list and try to make your first contribution to this community project: now that you are already acquainted with the peculiarities of the project, codebase, features, strong and week points of the project, try to get your hands dirty for the first time of your journey and fix something that thing that botters you the most on the project!
4. Fork the repository and start to get your ideas out of the paper: at this point you already know the intricacies and details of the architecture and how to expand it sets of features even further, why not try to make your project that can grow as much as wish?
5. Deploy your project using minimal resources: follow the deploy guideline (*link) and test your idea using almost no resources.
6. Escalate your project and get rich and famous: now that you found the game changing business model, it is time to move forward to the advanced deployment option that uses kubernetes and make your application availble to an incredible amount of people with and incredible scalable and thorough infrestructure.
7. Share your journey and your millionare company on the social media: use the hashtag #experimenting-early and tell everyone what you learned throughout the process and encourage others to become a better engineer/developer!

Uff... Hope you enjoy your journey!

## Features and characteristics

## What is still to be done?



## Architecture Concerns

The architecture of this application wsa strongly inspired in [Hexagonal architecture](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c), but slighly adapted to the context of the project. The resulting architecture schema can be found [here](https://drive.google.com/file/d/1i1Dqo_c9po73EM4eiuvt9cIZYN39ZvJR/view?usp=sharing). The main concern that drove the decision making of how to organize the application was to isolate the domain logic from implementation details as most as possible. 

It was developed using [Nest Framework](https://github.com/nestjs/nest) which also influenced deeply on the decisions made during development.

# Technical use instructions

## Installing the dependencies

```bash
$ npm install
```

## Running the app locally

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

# How to deploy your own project?

## Security concerns (DON'T PROCEED WITHOUT READING THIS SECTION)
NEVER expose private keys on your repository...
