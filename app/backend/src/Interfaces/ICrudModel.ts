import IMatch from './IMatch';

export interface IReaderModel<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
}

export interface IMatchCrudModel<T> extends IReaderModel<IMatch> {
  findByMatchStatus(query: string): Promise<T[]>
  finishMatch(id: number): Promise<void>
}
