import express from 'express';
import cors from 'cors';

const app = express();


app.use(
  cors({
    origin: '*',                           
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',                   
    exposedHeaders: '*',                   
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

app.options('*', cors());

app.use(express.json());


app.post('/evaluate', (req, res) => {
  const candidate = req.body;
  const flags: any[] = [];

  console.log(candidate)

  
  if (!candidate.firstName || !candidate.lastName || !candidate.email || !candidate.dob) {
    flags.push({
      field: 'Personal Information',
      message: 'Missing required personal information.',
      severity: 'error'
    });
  }
  if (!candidate.legalStatus) {
    flags.push({
      field: 'Legal Status',
      message: 'Legal status must be specified.',
      severity: 'error'
    });
  }
  if (candidate.hasLicence === false && candidate.licenceType === 'Canadian') {
    flags.push({
      field: 'Driver’s Licence',
      message: 'Canadian licence indicated but no licence possessed.',
      severity: 'warn'
    });
  }

  
  if (candidate.totalHours !== undefined && candidate.totalHours < 500) {
    flags.push({
      field: 'Total Hours',
      message: 'In-person work hours less than 500.',
      severity: 'warn'
    });
  }
  if (candidate.meetsCanadianExperience === false) {
    flags.push({
      field: 'Canadian Practice Criteria',
      message: 'Does not meet Canadian Practice Criteria.',
      severity: 'error'
    });
  }

  
  if (!candidate.medSchool || !candidate.degreeProgram || !candidate.gradYear) {
    flags.push({
      field: 'Medical Education',
      message: 'Incomplete medical education information.',
      severity: 'error'
    });
  }
  if (candidate.gradYear && candidate.gradYear < 1970) {
    flags.push({
      field: 'Graduation Year',
      message: 'Graduated before year 2000.',
      severity: 'warn'
    });
  }
  if (!candidate.educLang || candidate.educLang.toLowerCase() !== 'english') {
    flags.push({
      field: 'Language of Education',
      message: 'Education not primarily in English.',
      severity: 'warn'
    });
  }

  
  if (candidate.englishExam === false && candidate.activeEnglish === false) {
    flags.push({
      field: 'English Proficiency',
      message: 'No proof of English proficiency.',
      severity: 'error'
    });
  }

  
  if (candidate.rotationsCompleted === false) {
    flags.push({
      field: 'Rotations',
      message: 'Candidate did not complete 7 required rotations.',
      severity: 'error'
    });
  }
  if (candidate.impairment === true) {
    flags.push({
      field: 'Impairment',
      message: 'Candidate self-reported an impairment.',
      severity: 'warn'
    });
  }

  console.log(flags)

  res.json({ flags });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
