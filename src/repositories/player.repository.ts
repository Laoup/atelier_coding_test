import { where } from 'sequelize'
import { Player, PlayerCreationProps } from '../types/player'

const db = require('../db/models')

export interface CountryWinRatio {
  code: string
  picture: string
  wins: number
  games: number
  ratio: number
}

export const mapToPlayer = (model: any): Player => ({
  id: model.id,
  firstname: model.firstname,
  lastname: model.lastname,
  shortname: model.shortname,
  sex: model.sex,
  picture: model.picture,
  country: model.country,
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
  findByGenericInfo(firstname: string, lastname: string, shortname: string): Promise<Player | null>
  create(data: PlayerCreationProps): Promise<Player>
  getCountryWinRatios(): Promise<CountryWinRatio[]>
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

  async findByGenericInfo(
    firstname: string,
    lastname: string,
    shortname: string
  ): Promise<Player | null> {
    const player = await db.Player.findOne({
      where: {
        firstname,
        lastname,
        shortname,
      },
    })

    return player ? mapToPlayer(player) : null
  },

  async create(data: PlayerCreationProps): Promise<Player> {
    const created = await db.Player.create(data)

    return mapToPlayer(created)
  },

  async getCountryWinRatios(): Promise<CountryWinRatio[]> {
    const players = await db.Player.findAll({
      attributes: ['country', 'last'],
    })

    const countryStats = new Map<string, CountryWinRatio>()

    players.forEach((player: any) => {
      const country = player.country

      const last = Array.isArray(player.last) ? player.last : []
      const wins = last.filter((game: any) => game === 1).length
      const games = last.length

      const existing = countryStats.get(country.code) || {
        code: country.code,
        picture: country.picture,
        wins: 0,
        games: 0,
        ratio: 0,
      }

      const updatedWins = existing.wins + wins
      const updatedGames = existing.games + games

      countryStats.set(country.code, {
        ...existing,
        wins: updatedWins,
        games: updatedGames,
        ratio: updatedGames ? updatedWins / updatedGames : 0,
      })
    })

    return Array.from(countryStats.values()).sort((a, b) => b.ratio - a.ratio)
  },
}
