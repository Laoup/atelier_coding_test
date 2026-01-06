import { FastifyInstance } from "fastify";
import { getPlayers, getPlayerById } from "../controllers/players.controllers";

export const playerRoutes = async (server: FastifyInstance) => {

  server.get(
    '/',
    getPlayers
  )

  server.get(
    '/:id',
    getPlayerById
  )

  

}