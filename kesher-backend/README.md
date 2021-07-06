# backend


## Installation

Don't forget  to install [node js](https://nodejs.org/en/) if you don't have it yet.
```bash
npm install
npm install -g nodemon
```

## Environment variable

Need to open a new ```.env``` file and add these lines:

Connection string to mongoDB.
```bash
DB=mongodb+srv://example@example.yxpbt.mongodb.net/exaple?retryWrites=true&w=majority
```
Long randomized string.

crypto.randomBytes(64).toString('hex') can be used.
```
TOKEN_SECRET=
```
Gmail account details for the mail service.
```
MAIL=mail@gmial.com
PASSWORD=password123
```


## Run the app
```bash
npm run dev
```

