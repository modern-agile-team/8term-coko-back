export class ResPartDto {
  readonly id: number;
  readonly sectionId: number;
  readonly name: string;

  constructor({ id, sectionId, name }) {
    this.id = id;
    this.sectionId = sectionId;
    this.name = name;
  }

  static fromArray(parts: ResPartDto[]) {
    return parts.map((part) => new ResPartDto(part));
  }
}
