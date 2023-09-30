export interface IReaderModel<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
}

export interface IAnotherReaderModel<T> {
  findAll(): Promise<T[]>
  findByMatchStatus(query: string): Promise<T[]>
}
