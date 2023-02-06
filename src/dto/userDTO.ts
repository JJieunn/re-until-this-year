export interface CheckDataDTO {
  email: string
}

export interface CreateDataDTO {
  nickname: string,
  email: string,
  fortune_id: string,
  opt_in: boolean,
  goals: string[]
}

export interface ReturnDataDTO {
  id: number,
  email: string
}

export interface UpdateDataDTO {
  nickname: string,
  email: string,
  fortune_id: string,
  opt_in: boolean,
  image?: string,
  goals: string[]
}