export interface Player {
  id: number
  firstname: string
  lastname: string
  shortname: string
  sex: string
  picture: string
  country: {
    code: string
    picture: string
  }
  rank: number
  points: number
  weight: number
  height: number
  age: number
  last: number[]
  createdAt: Date
  updatedAt: Date
}

// export type PlayerCreationAttributes = Omit<
//   PlayerAttributes,
//   'id' | 'createdAt' | 'updatedAt'
// >
