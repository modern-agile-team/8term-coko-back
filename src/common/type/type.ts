import { PartStatus } from 'src/part-progress/entities/part-progress.entity';
import { Part } from 'src/parts/entities/part.entity';
import { Section } from 'src/sections/entities/section.entity';

export type SectionParts = Section & { part: Part[] };

export type SectionPartsStatus = Section & {
  part: (Part & { status: PartStatus })[];
};

export type SectionPartsPartProgress = Section & {
  part: (Part & { PartProgress: { status: PartStatus }[] })[];
};
