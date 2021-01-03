export class Todo {
  public id: number;
  public title: string;
  public status: boolean;
  constructor(title: string, status: boolean) {
    this.title = title;
    this.status = status;
  }
}
