# Implementation Details:

## General Approach
I wanted to get a working solution first and refactor next. The project was divided into the following tasks  
- Create the project structure
- Add all the necessary packages
- Create an /intent endpoint
- Connect with public API
- Install Mysql and create migrations
- Fetch the reply from data store
- Exception handling
- Adding specs
- Started documentation
- Added type safety to serializers
- Solved all linting errors
- Setup Github Actions

## Technologies Used
- Typescript
- Nodejs
- Express
- Jest(for testing)
- node-fetch, faker, node-mocks-http for testing
- TypeORM
- MySQL
- Json-api-serialiser
- Helmet
- Github
 
## API
- `GET /api/v1/intent` -> returns a reply for the given message.

  Sample Request Body
  ```
  {
    "data": {
        "type": "replies",
        "attributes": {
            "botId": "5f74865056d7bb000fcd39ff",
            "message": "Hello"
        }
    }
  }
  ```

  Sample Response Body
  ```
  {
    "meta": {},
    "data": {
        "type": "replies",
        "attributes": {
            "reply": "Hello there! How are you?"
        }
    }
  }
  ```

## How to run
Create a mysql db and update the configs accordingly.
Build the project
```sh
yarn build
```

Runs the migrations

```sh
yarn db migration:run
```

From the mysql console, populate reply. We don't have a db seeder at the moment.

```sh
insert into reply (intent, reply) values (':add_intent', ':add_reply');
```

Start the server in watch mode

```sh
yarn start
```

Run tests

```sh
yarn test

yarn test:coverage #for test coverage report
```

Linting

```sh
yarn lint

yarn lint --fix #for fixing all the lint errors
```

## Architecture Diagram
<img width="416" alt="Basic Arch" src="https://user-images.githubusercontent.com/13963969/134550800-c92341ba-585f-4e61-83d5-cf563aa673b8.png">

## Folder Structure
### A top level brief of structure
    src
    ├── controllers            # All the controllers
    ├── db                     # Migrations and orm config
    ├── entity                 # Typeorm entities
    ├── errors                 # Custom errors
    ├── lib                    # Any third party and first party integrations
    ├── middlewares            # Just middlewarawes
    ├── routes                 # Register all the controller with express
    ├── serializers            # JSONAPI serilizer files
    ├── services               # Core business logic
    ├── types                  # Type definitions
    └── config files

## Architecture Notes

- ### API Design: 
  - Follows REST standarads.
  - Future scope for versioning of APIs. 
  - I wanted to write something more standardised so I chose to follow https://jsonapi.org standards. The API expects and also reponds back accoding to the jsonapi standards.

- ### Database
  - I chose to use mysql because for two main reasons. Firstly, I have experience and it was easy to set up and use. Secondly, Mongodb involved some learning curve, which I am willing to but due to lack of time I went my MySql.
  - All the schema are added through migrations
  - Index for 'intent' is added because we search on intent for reply.

- ### Exception Handling
  - Custom exception have been raised throughout the application which are propagated back to the controller. 
  - We can push the exceptions to any monitoring service. (DataDog, AWS Cloudtrail).

- ### Specs
  - Unit tests are written for controllers, services and library.
  - I aimed for 100% coverarge of business logic. 
  - More specs can be written to improve the coverage.

- ### Github Actions
  - Currenlty there's one workflow, which is triggered on push to master, to build and run the tests in github actions

- ### Security
  - Minimal security is achieved with helmet package. The rest of the security aspects could be looked in-depth while deciding the infrastructure.

- ### Caching
  - We can implement caching to store the frequently used intents and their responses. 
  - Redis can be used.

- ### Application Logging and Monitoring
  - Currently, expection handling is the only logs in the application. We can use something like winston and push the logs to thrid party log aggregator.
  - Application monitoring depends on the kind of infrastructure the team decides to use.

- ### Docker
  - For the sake of assignment I didn't want to get into the containarizing the application. Ideally, I would be inclined to containarize any application that goes to production.

## Assumptions
  - In the current solution, I have picked the top object from the response of the public API. It looks like the API response is in the descending order of confidence scores.
  - The public API is always available, I did not handle the cases when public API id down.
  - All the replies specific to an intent are available in the db. There is only one reply for every intent. This may not be the case. We can implement different strategies.

## ToDo
- Logging
- Use Inversify for dependecy injection. (felt like an overkill for single API)
- Authorization
- Dockerize the application
- Add more tests
- Database seeder file to load the data
- API documentation (because there was only one endpoint, I documented everything in README)

## Futuristic Work
  - Store the top K responses in cache to respond faster to the queires. This may also help us to make less hits to the Public API. Can also serve as a conversational saver whe the public API or DB is down.
  - Collect feedback from bots and push to the AI engine.
  - Implement multiple strategies to pick the replies based on the confidence scores.

## Things I am contemplating 
- Deployment strategy
- Rate limiting
- Load testing
