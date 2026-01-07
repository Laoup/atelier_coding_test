import { FastifyReply, FastifyRequest } from "fastify"
import { PlayerAlreadyExistError, PlayerNotFoundError, playerService } from "../services/player.service"
import { PlayerCreationProps } from "../types/player"

export const getPlayers = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const players = await playerService.getPlayers()
    
    return reply.status(200).send({ data: players })
  } catch (error) {
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

    return reply.status(200).send({ data: player })
  } catch (error) {
    if (error instanceof PlayerNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}

export const getStats = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const stats = await playerService.getStats()

    return reply.status(200).send({ data: stats })
  } catch (error) {
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}

export const createPlayer = async (
  request: FastifyRequest<{
    Body: PlayerCreationProps
  }>,
  reply: FastifyReply
) => {

  const {
    firstname,
    lastname,
    shortname,
    sex,
    picture,
    country,
    rank,
    points,
    weight,
    height,
    age,
    last
  } = request.body

  try {
    const player = await playerService.createPlayer({
      firstname,
      lastname,
      shortname,
      sex,
      picture,
      country,
      rank,
      points,
      weight,
      height,
      age,
      last
    })

    return reply.status(201).send({ data: player })
  } catch (error) {
    if (error instanceof PlayerAlreadyExistError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}