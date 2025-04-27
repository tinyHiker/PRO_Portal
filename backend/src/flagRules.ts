import { Candidate, Flag } from './types.ts';   

export function evaluateCandidate(c: Candidate): Flag[] {
  const flags: Flag[] = [];

  const need = (k: keyof Candidate, msg: string) => {
    if (c[k] === undefined || c[k] === null || c[k] === '')
      flags.push({ field: k as string, message: msg, severity: 'error' });
  };

  
  need('name',    'Name is required');
  need('nacExam', 'NAC result missing');
  need('mccqe1',  'MCCQE-1 result missing');

  
  if (c.nacExam && c.nacExam !== 'Pass')
    flags.push({ field: 'nacExam', message: 'NAC exam failed', severity: 'error' });

  if (c.mccqe1 && c.mccqe1 !== 'Pass')
    flags.push({ field: 'mccqe1', message: 'MCCQE-1 failed', severity: 'error' });

  const now = new Date().getFullYear();
  if (c.lastPracticeYear && now - c.lastPracticeYear > 3)
    flags.push({ field: 'lastPracticeYear',
                 message: 'Last practice > 3 years ago',
                 severity: 'error' });

  if (c.rotationsCompleted === false)
    flags.push({ field: 'rotationsCompleted',
                 message: 'Fewer than 7 rotations',
                 severity: 'error' });

  if (c.practiceGapMonths && c.practiceGapMonths > 12)
    flags.push({ field: 'practiceGapMonths',
                 message: 'Practice gap > 12 months',
                 severity: 'error' });

  if (c.impairment)
    flags.push({ field: 'impairment',
                 message: 'Impairment declared',
                 severity: 'warn' });

  return flags;
}
