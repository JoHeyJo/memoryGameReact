export interface CardInterface {
  code: number
  image: string
  images: string
  value: string
  suit: string
}

export interface IGetCards {
  success: boolean
  cards: any
  deck_id: string
  remaining: number
}
