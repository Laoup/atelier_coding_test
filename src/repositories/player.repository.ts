import { Player } from "../types/player"

const db = require('../db/models')

export const mapToPlayer = (model: any): Player => ({
  id: model.id,
  firstname: model.firstname,
  lastname: model.lastname,
  shortname: model.shortname,
  sex: model.sex,
  picture: model.picture,
  rank: model.rank,
  points: model.points,
  weight: model.weight,
  height: model.height,
  age: model.age,
  last: model.last,
  createdAt: model.createdAt,
  updatedAt: model.updatedAt,
})

export interface PlayerRepository {
  findAll(): Promise<Player[]>
  findById(id: number): Promise<Player | null>
}

export const playerRepository: PlayerRepository = {
  async findAll(): Promise<Player[]> {
    const players = await db.Player.findAll({
      order: [['rank', 'ASC']],
    })

    return players.map(mapToPlayer)
  },

  async findById(id: number): Promise<Player | null> {
    const player = await db.Player.findByPk(id)
    return player ? mapToPlayer(player) : null
  },
}
