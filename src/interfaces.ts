export interface CardInterface {
  code: string
  image: string
  images: string
  value: string
  suit: string
}

export interface IGetCards {
  success: boolean
  cards: []
  deck_id: string
  remaining: number
}
