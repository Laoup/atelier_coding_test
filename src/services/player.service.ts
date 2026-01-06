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

  async getStats(): Promise<{ topCountry: CountryWinRatio, imc: number, medianHeight: number }> {
    const players = await this.repository.findAll()
    const countries = await this.repository.getCountryWinRatios()

    const medianHeight = this.calculateMedian(
      players
        .map((player) => player.height)
    )

    const imc = this.calculateAverageImc(players)

    return {
      topCountry: countries[0]!,
      imc,
      medianHeight,
    }
  }

  private calculateAverageImc(players: Player[]): number {
    let totalImc = 0
    let countedPlayers = 0

    players.forEach((player) => {
      const heightMeters = player.height / 100
      if (!heightMeters) return

      const weightKg = player.weight / 1000
      const imc = weightKg / (heightMeters * heightMeters)

      totalImc += imc
      countedPlayers += 1
    })

    return countedPlayers ? totalImc / countedPlayers : 0
  }

  private calculateMedian(values: number[]): number {
    if (!values.length) return 0

    const sorted = [...values].sort((a, b) => a - b)
    const middle = Math.floor(sorted.length / 2)

    return sorted.length % 2 !== 0
      ? sorted[middle]!
      : (sorted[middle - 1]! + sorted[middle]!) / 2
  }
}

export const playerService = new PlayerService(playerRepository) 
