import express from 'express';
import cors from 'cors';
import { evaluateCandidate } from './flagRules.ts';  
import { Candidate } from './types.ts';             

const app = express();
app.use(cors());
app.use(express.json());

app.post('/evaluate', (req, res) => {
  const cand = req.body as Candidate;
  res.json({ flags: evaluateCandidate(cand) });
});

app.get("/test", (req, res) => {
    res.json({
        "event-planner": "Taha"
    })
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running → http://localhost:${PORT}`));
