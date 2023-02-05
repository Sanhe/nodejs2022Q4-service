export default interface EntityDbInterface<Entity> {
  add(entity: Entity): Promise<void>;

  findByField(field: string, value: string): Promise<Entity[]>;

  findById(id: string): Promise<Entity | undefined>;

  findByIds(ids: string[]): Promise<Entity[]>;

  findAll(): Promise<Entity[]>;

  update(id: string, entity: Entity): Promise<Entity>;

  remove(id: string): Promise<void>;
}
