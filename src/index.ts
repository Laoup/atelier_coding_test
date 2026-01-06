import { config as loadEnv } from 'dotenv'
import Fastify from 'fastify'
import { playerRoutes } from './routes/players.routes'

const db = require('./db/models')

loadEnv()

const server = Fastify({
  logger: true,
})

server.get('/health', async () => {
  return { status: 'ok' }
})

server.register(playerRoutes, { prefix: '/players' })

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000
    const host = process.env.HOST ?? '0.0.0.0'

    await db.sequelize.authenticate()
    server.log.info('Database connection established.')

    await server.listen({ port, host })
    server.log.info(`Server listening on http://${host}:${port}`)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}

void start()
