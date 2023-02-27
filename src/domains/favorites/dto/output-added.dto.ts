export class OutputAddedDto {
  added: boolean;
  message: string;

  constructor(added: boolean, message: string) {
    this.added = added;
    this.message = message;
  }
}
