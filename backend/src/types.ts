export interface Candidate {
    name: string;
    nacExam: 'Pass' | 'Fail' | '';
    mccqe1: 'Pass' | 'Fail' | '';
    lastPracticeYear?: number;
    canadianExperienceMonths?: number;
    practiceGapMonths?: number;
    rotationsCompleted?: boolean;
    impairment?: boolean;
  }
  
export interface Flag {
    field: string;
    message: string;
    severity: 'error' | 'warn';
  }
  