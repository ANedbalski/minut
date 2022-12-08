# Application is a test task of the from the Minut

## Starting application

to start application please use command:

```bash
make run
```

## Application design:

In the solution I've implemented hexagonal architecture and some DDD practices.

-   domain folder - the main application logic
-   port folder - the user's entry point to the application. As one of implementation - express REST API
-   repository - the Database implementations. Currently the Inmemory DB created.

## Application assumptions and simplification

As this application is test task, I've made some simplifications

### There is no real database.

Instead the Inmemory storage used to store the data. So after the restart all data will be erased. Meanwhile there are
some fixtures loading on app start.

### JWT fake auth

to authorize user the jwt token required. But to simplify usage there is no real encoding used. Instead the userId is
used as plain in the middle part of jwt token. For example, for the user with id: '53f67500-2f30-468f-9cdc-1a42854b216c'
the next token can be used: 'AnYSymboLS.53f67500-2f30-468f-9cdc-1a42854b216c.AnYSymboLS' the predefined users in
fixtures: Managers:

```
'53f67500-2f30-468f-9cdc-1a42854b216c'
'a0ca8ada-4afd-4fa5-be2f-7d64714f18cb'
```

Guests:

```
'53f67500-2f30-468f-9cdc-1a4285432434'
'a0ca8ada-4afd-4fa5-be2f-7d64743423443'
```

## Insomnia collection

You may use insomnia collection export file to in the project root to get all the endpoints.
