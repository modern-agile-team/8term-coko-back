interface PartModel {
  id: number;
  sectionId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Part implements PartModel {
  id: number;
  sectionId: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
