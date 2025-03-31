## Description

[Nest](https://github.com/nestjs/nest) framework educational project on using [Authentication](https://docs.nestjs.com/security/authentication) and [Authorization](https://docs.nestjs.com/security/authorization).

This project showcases JWT and Guards to support Authentication and Authorization, data persisted to Redis.


## Installation

```bash
$ npm install
```


### Dependencies

```bash
$ npm install dotenv
$ npm install ioredis
$ npm install uuid
$ npm install cookie-parser
$ npm install bcrypt
```

## Running the app

```bash
# development
$ npm start

# watch mode
$ nest start --watch
```

## Testing the app

- Go to http://localhost:3000 from browser, you should get HTTP 200 with text response 'Hello World!'.
- Perform HTTP GET http://localhost:3000/auth/profile from Postman, you should get HTTP 401 response.
- Perform HTTP POST http://localhost:3000/auth/login with JSON body `{"username":"stipe", "password":"password123"}` from Postman, you should get HTTP 200 response.
- Perform HTTP GET http://localhost:3000/auth/profile, you should get HTTP 200 with JSON response.
- Perform HTTP GET http://localhost:3000/users, you should get HTTP 403 response. This is because logged user does not have admin privileges. Re-login using `{"username":"jure", "password":"password321"}` and retry this endpoint, it should return HTTP 200 with all users in response.

## Deploying the app

### Render.com

- Register free account (hobby plan) on https://render.com/
- Create a new **Key Value** service, store connection string to use later
- Create a new **Web Service** by connecting this public GitHub repository
    - Add environment variable **REDIS_URL** with value from Key Value connection string
    - Add environment variable **NODE_ENV** with value *production*
- Deploy service & view public URL

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use it however you want.
