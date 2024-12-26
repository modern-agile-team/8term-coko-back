interface PartModel {
  id: number;
  sectionId: number;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Part implements PartModel {
  id: number;
  sectionId: number;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
