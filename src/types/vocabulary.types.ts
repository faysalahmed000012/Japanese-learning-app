import ILesson from "./lesson.types";

export default interface IVocabulary {
  _id?: string;
  word: string;
  pronunciation: string;
  meaning: string;
  whenToSay: string;
  lesson: ILesson;
  adminEmail: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVocabularyUpdateProps {
  _id?: string;
  word?: string;
  pronunciation?: string;
  meaning?: string;
  whenToSay?: string;
  lesson?: number;
  adminEmail?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
