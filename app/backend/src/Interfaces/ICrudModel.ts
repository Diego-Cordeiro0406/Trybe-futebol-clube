export interface IReaderModel<T> {
  findAll(): Promise<T[]>
}
