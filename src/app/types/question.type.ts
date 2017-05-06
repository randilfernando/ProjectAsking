export interface Question {
  _id: string;
  title: string;
  moduleCode: string;
  moduleName: string;
  topic: string;
  description: string;
  tags: string[];
  totalAnswers: number;
  totalRatings: number;
  submittedBy: string;
}
