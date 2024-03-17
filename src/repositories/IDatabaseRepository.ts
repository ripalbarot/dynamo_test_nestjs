export interface IDatabaseRepository<T> {
  save(item: T): Promise<T>;
  findById(id: string): Promise<T>;
}
export const DATABASE_REPOSITORY = Symbol('Database Repository');
