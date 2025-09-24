import fastify from 'fastify'
import { routes } from './http/routes/index.js'

const app = fastify()

app.register(routes)

export { app }