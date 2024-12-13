export default interface ILesson {
  _id?: string;
  lessonName: string;
  lessonNumber: number;
  vocabularyCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ILessonData {
  lessonName: string;
  lessonNumber: number;
}
