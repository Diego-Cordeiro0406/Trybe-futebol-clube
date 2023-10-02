import { scoreType } from '../types/scoreType';
import IMatch from './IMatch';

export interface IReaderModel<T> {
  findAll(): Promise<T[]>
  findById(id: number): Promise<T | null>
}

export interface IMatchCrudModel<T> extends IReaderModel<IMatch> {
  findByMatchStatus(query: string): Promise<T[]>
  finishMatch(id: number): Promise<void>
  updatePartialMatch(id: number, data: scoreType): Promise<IMatch | null>
  createMatch(data: Partial<IMatch>): Promise<IMatch>
}

export type NewEntity<T> = Omit<T, 'id'>;
