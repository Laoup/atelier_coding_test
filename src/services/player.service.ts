import { playerRepository, PlayerRepository } from "../repositories/player.repository";
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
}

export const playerService = new PlayerService(playerRepository) 