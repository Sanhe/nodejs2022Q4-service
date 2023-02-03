export default interface EntityDbInterface<Entity> {
  save(entity: Entity): Promise<void>;

  findById(id: string): Promise<Entity | undefined>;

  findAll(): Promise<Entity[]>;

  update(id: string, entity: Entity): Promise<void>;

  remove(id: string): Promise<void>;
}
