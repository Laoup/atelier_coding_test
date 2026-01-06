import { FastifyReply, FastifyRequest } from "fastify"
import { playerService } from "../services/player.service"

export const getPlayers = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const players = await playerService.getPlayers()
    return reply.status(200).send({ data: players })
  } catch (error) {
    request.log.error({ err: error }, 'Failed to fetch players')
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}

export const getPlayerById = async (
  request: FastifyRequest<{
    Params: { id: number }
  }>,
  reply: FastifyReply
) => {
  const { id } = request.params
  
  try {
    const player = await playerService.getPlayerById(id)

  } catch (error) {
    request.log.error({ err: error }, 'Failed to fetch player')
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}