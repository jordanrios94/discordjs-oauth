# discordjs-oauth
An example for HL on how to implement OAuth

## Dependencies:
- Serverless (`npm install -g serverless`)

Set the following env vars like this:
```
# PORT
PORT = 3000

# TOKEN
SECRET_KEY = yourSessionKey
JWT_SECRET_KEY = yourJWTkey

DISCORD_SECRET_KEY = supersecret
DISCORD_CLIENT_ID = mildlysecret
DISCORD_PORT = 53134
SERVER_URL = http://localhost:3000
```
in `.env.development.local`

## To deploy

run `npm run deploy`
