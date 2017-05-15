export interface ModuleReport {
  moduleCode: string;
  moduleName: string;
  answeredCount: number;
  unansweredCount: number;
  topics: {
    _id: string;
    count: number;
  }[]
}
