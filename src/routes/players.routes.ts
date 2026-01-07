import { FastifyInstance } from "fastify";
import { getPlayers, getPlayerById, getStats, createPlayer } from "../controllers/players.controllers";

export const playerRoutes = async (server: FastifyInstance) => {

  server.get(
    '/',
    getPlayers
  )

  server.get(
    '/:id',
    getPlayerById
  )

  server.get(
    '/stats',
    getStats
  )

  server.post(
    '/',
    createPlayer
  )

}
