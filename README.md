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
 
## Architecture Diagram
<img width="416" alt="Basic Arch" src="https://user-images.githubusercontent.com/13963969/134550800-c92341ba-585f-4e61-83d5-cf563aa673b8.png">

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

Start the server in watch mode

```sh
yarn start
```

Run tests

```sh
yarn test
```

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

Note: I am disappointed at myself for not maintaining a proper commit history. Pushing everything in one commit is not my style.

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

- ### Githu bActios
  - Currenlty there's one workflow, which is triggered on push to master, to build and run the tests in github actions

- ### Docker
  - For the sake of assignment I didn't want to get into the containarizing the application. Ideally, I would be inclined to containarize any application that goes to production.

## ToDo
- Logging
- Use Inversify for dependecy injection. (felt like an overkill for single API)
- Authorization
- Dockerize the application
- Add more tests
- Database seeder file to load the data
- API documentation (Swagger)

## Things I am contemplating 
- Deployment strategy
- Rate limiting
- Load testing
