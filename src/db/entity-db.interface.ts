export default interface EntityDbInterface<Entity> {
  add(entity: Entity): Promise<void>;

  findById(id: string): Promise<Entity | undefined>;

  findByField(field: string, value: string): Promise<Entity[]>;

  findAll(): Promise<Entity[]>;

  update(id: string, entity: Entity): Promise<Entity>;

  remove(id: string): Promise<void>;
}
