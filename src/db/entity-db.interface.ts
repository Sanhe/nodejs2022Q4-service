export default interface EntityDbInterface<Entity> {
  add(entity: Entity): Promise<void>;

  findById(id: string): Promise<Entity | undefined>;

  findAll(): Promise<Entity[]>;

  update(id: string, entity: Entity): Promise<Entity>;

  remove(id: string): Promise<void>;
}
