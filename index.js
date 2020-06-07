const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const access = require('./utils/access')

const redis = require('redis')
const expressSession = require('express-session')
const redisSessionStore = require('connect-redis')(expressSession)
const redisClient = redis.createClient(process.env.SESSION_PORT, process.env.SESSION_HOST)

const initialiseData = require('./initial-data')
const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose')

const User = require('./list/User')
const Post = require('./list/Post')

const PROJECT_NAME = 'KeyTest'
const adapterConfig = { mongoUri: 'mongodb://keystone-mongo:27017/keytt' }


const keystone = new Keystone({
  name: PROJECT_NAME,
  adapter: new Adapter(adapterConfig),
  sessionStore: new redisSessionStore({
    host: process.env.SESSION_HOST,
    port: process.env.SESSION_PORT,
    db: Number(process.env.SESSION_DB),
    client: redisClient,
  }),
  cookieSecret: 'ilsecret',
  onConnect: initialiseData,
})

keystone.createList('User', User)
keystone.createList('Post', Post)

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      enableDefaultRoute: true,
      authStrategy,
      isAccessAllowed: ({ authentication: { item: user, listKey: list } }) => !!user && !!user.isAdmin,
    }),
  ],
}
