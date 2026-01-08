import {
  PlayerAlreadyExistError,
  PlayerNotFoundError,
  PlayerService,
} from '../src/services/player.service'
import { PlayerRepository } from '../src/repositories/player.repository'
import { Player, PlayerCreationProps } from '../src/types/player'

const basePlayerCreation: PlayerCreationProps = {
  firstname: 'Roger',
  lastname: 'Federer',
  shortname: 'R.FED',
  sex: 'M',
  picture: 'roger.png',
  country: {
    code: 'SUI',
    picture: 'sui.png',
  },
  rank: 1,
  points: 12000,
  weight: 82000,
  height: 185,
  age: 38,
  last: [1, 0, 1, 1, 0],
}

const buildPlayerCreation = (
  overrides: Partial<PlayerCreationProps> = {}
): PlayerCreationProps => ({
  ...basePlayerCreation,
  ...overrides,
})

const buildPlayer = (overrides: Partial<Player> = {}): Player => ({
  id: 1,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-02-01T00:00:00Z'),
  ...basePlayerCreation,
  ...overrides,
})

const buildRepository = (overrides: Partial<PlayerRepository> = {}): PlayerRepository => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  findByGenericInfo: jest.fn(),
  create: jest.fn(),
  getCountryWinRatios: jest.fn(),
})

describe('Player Service Unit Test', () => {
  let repository: PlayerRepository
  let service: PlayerService

  beforeEach(() => {
    repository = buildRepository()
    service = new PlayerService(repository)
  })

  describe('getPlayers', () => {
    it('Should get all players', async () => {
      const players = [buildPlayer({ id: 1 }), buildPlayer({ id: 2 })]
      jest.spyOn(repository, 'findAll').mockResolvedValue(players)

      const result = await service.getPlayers()

      expect(repository.findAll).toHaveBeenCalledTimes(1)
      expect(result).toEqual(players)
    })

    it('should get all players but there is no players', async () => {
      jest.spyOn(repository, 'findAll').mockResolvedValue([])

      const result = await service.getPlayers()

      expect(repository.findAll).toHaveBeenCalledTimes(1)
      expect(result).toEqual([])
    })
  })

  describe('getPlayerById', () => {
    it('Should get player by a specific ID', async () => {
      const player = buildPlayer({ id: 7 })
      jest.spyOn(repository, 'findById').mockResolvedValue(player)

      const result = await service.getPlayerById(7)

      expect(repository.findById).toHaveBeenCalledWith(7)
      expect(result).toEqual(player)
    })

    it('Should get player by a specific ID but the player doesnt exist', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null)

      await expect(service.getPlayerById(404)).rejects.toBeInstanceOf(PlayerNotFoundError)
      expect(repository.findById).toHaveBeenCalledWith(404)
    })
  })

  describe('getStats', () => {
    it('Should get statistics based on players', async () => {
      const players = [
        buildPlayer({ id: 1, height: 180, weight: 80000 }),
        buildPlayer({ id: 2, height: 160, weight: 60000 }),
      ]
      const countries = [
        { code: 'FRA', picture: 'fr.png', wins: 10, games: 12, ratio: 0.83 },
        { code: 'USA', picture: 'us.png', wins: 5, games: 12, ratio: 0.42 },
      ]
      jest.spyOn(repository, 'findAll').mockResolvedValue(players)
      jest.spyOn(repository, 'getCountryWinRatios').mockResolvedValue(countries)

      const result = await service.getStats()

      expect(repository.findAll).toHaveBeenCalledTimes(1)
      expect(repository.getCountryWinRatios).toHaveBeenCalledTimes(1)
      expect(result.topCountry).toEqual(countries[0])
      // median computed on height
      expect(result.medianHeight).toBe(170)
      // imc computed on weight
      expect(Number(result.imc.toFixed(2))).toBe(24.06)
    })
  })

  describe('createPlayer', () => {
    it('Should create a new player', async () => {
      const input = buildPlayerCreation({
        firstname: 'Serena',
        lastname: 'Williams',
        shortname: 'S.WIL',
      })
      const created = buildPlayer({ id: 3, ...input })
      jest.spyOn(repository, 'findByGenericInfo').mockResolvedValue(null)
      jest.spyOn(repository, 'create').mockResolvedValue(created)

      const result = await service.createPlayer(input)

      expect(repository.findByGenericInfo).toHaveBeenCalledWith(
        input.firstname,
        input.lastname,
        input.shortname
      )
      expect(repository.create).toHaveBeenCalledWith(input)
      expect(result).toEqual(created)
    })

    it('should throw an error if the player already exist', async () => {
      const input = buildPlayerCreation({
        firstname: 'Rafael',
        lastname: 'Nadal',
        shortname: 'R.NAD',
      })
      jest
        .spyOn(repository, 'findByGenericInfo')
        .mockResolvedValue(buildPlayer({ id: 11, ...input }))

      await expect(service.createPlayer(input)).rejects.toBeInstanceOf(PlayerAlreadyExistError)
      expect(repository.findByGenericInfo).toHaveBeenCalledWith(
        input.firstname,
        input.lastname,
        input.shortname
      )
    })
  })
})
