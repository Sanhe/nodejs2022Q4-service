export default abstract class AbstractEntity<Entity> {
  protected readonly entities: Entity[] = [];

  async save(entity: Entity): Promise<void> {
    this.entities.push(entity);
  }

  async findById(id: string): Promise<Entity | undefined> {
    return this.entities.find((en) => en['id'] === id);
  }

  async findAll(): Promise<Entity[]> {
    return this.entities;
  }

  async update(id: string, ent: Entity): Promise<void> {
    const index = this.entities.findIndex((en) => en['id'] === id);
    this.entities[index] = ent;
  }

  async remove(id: string): Promise<void> {
    const index = this.entities.findIndex((en) => en['id'] === id);
    this.entities.splice(index, 1);
  }
}
