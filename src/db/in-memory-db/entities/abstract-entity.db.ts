export default abstract class AbstractEntity<Entity> {
  protected readonly entities: Entity[] = [];

  constructor(initialEntities: Entity[] = []) {
    this.entities = initialEntities;
  }

  async add(entity: Entity): Promise<void> {
    this.entities.push(entity);
  }

  async findByField(field: string, value: string): Promise<Entity[]> {
    return this.entities.filter((en) => en[field] === value);
  }

  async findById(id: string): Promise<Entity | undefined> {
    return this.entities.find((en) => en['id'] === id);
  }

  async findAll(): Promise<Entity[]> {
    return this.entities;
  }

  async update(id: string, ent: Entity): Promise<Entity> {
    const index = this.entities.findIndex((en) => en['id'] === id);
    this.entities[index] = {
      id,
      ...ent,
    };

    return this.entities[index];
  }

  async remove(id: string): Promise<void> {
    const index = this.entities.findIndex((en) => en['id'] === id);
    this.entities.splice(index, 1);
  }
}
