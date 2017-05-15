export interface OverallReport {
  answeredCount: number;
  unansweredCount: number;
  modules: {
    moduleCode: string;
    moduleName: string;
    totalQuestions: number;
  }[]
}
