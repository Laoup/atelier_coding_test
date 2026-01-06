import { playerRepository, PlayerRepository, CountryWinRatio } from "../repositories/player.repository";
import { Player } from "../types/player";


export class PlayerNotFoundError extends Error {
  constructor(id: number) {
    super(`Player with id ${id} not found.`)
    this.name = 'PlayerNotFoundError'
  }
}

export class PlayerService {
  constructor(private readonly repository: PlayerRepository) {}

  async getPlayers(): Promise<Player[]> {
    return await this.repository.findAll()
  }

  async getPlayerById(id: number): Promise<Player> {
    const player = await this.repository.findById(id)

    if (!player)
      throw new PlayerNotFoundError(id)

    return player
  }

  async getStats(): Promise<{ topCountry: CountryWinRatio, imc: number }> {
    const countries = await this.repository.getCountryWinRatios()

    const imc = await this.getIMC()

    return {
      topCountry: countries[0]!,
      imc,
    }
  }

  async getIMC(): Promise<number> {
    const players = await this.repository.findAll()

    let totalImc = 0
    let countedPlayers = 0

    players.forEach((player) => {
      const heightMeters = player.height / 100

      const weightKg = player.weight / 1000
      const imc = weightKg / (heightMeters * heightMeters)

      totalImc += imc
      countedPlayers += 1
    })

    return countedPlayers ? totalImc / countedPlayers : 0
  }
}

export const playerService = new PlayerService(playerRepository) 
