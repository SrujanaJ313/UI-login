import React, { useState } from "react";
import {
  // Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  //   SelectChangeEvent,
  TextField,
//   Typography,
//   Grid,
} from "@mui/material";

const questionsList = [
  [
    "What was your childhood nickname?",
    "What is the name of your first pet?",
    "What was your favorite subject in school?",
    "What was the name of your elementary school?",
    "What was your dream job as a child?",
  ],
  [
    "What was the name of your first stuffed animal?",
    "What was the first concert you attended?",
    "What is your favorite movie of all time?",
    "What is the middle name of your oldest sibling?",
    "What is your mother’s maiden name?",
  ],
  [
    "What city were you born in?",
    "What was the name of your first teacher?",
    "What is your favorite book?",
    "What is the name of the street you grew up on?",
    "What is your favorite sport?",
  ],
  [
    "What was the name of your childhood best friend?",
    "What is your father’s middle name?",
    "What is your favorite holiday destination?",
    "What was your high school mascot?",
    "What was the make of your first car?",
  ],
  [
    "What is the name of your favorite childhood TV show?",
    "What food do you hate the most?",
    "Who was your first celebrity crush?",
    "What was your first phone number?",
    "What is your favorite ice cream flavor?",
  ],
];

export const SecurityQuestions = () => {
  const [selectedQuestions, setSelectedQuestions] = useState(Array(5).fill(""));
  const [answers, setAnswers] = useState(Array(5).fill(""));

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...selectedQuestions];
    newQuestions[index] = event.target.value;
    setSelectedQuestions(newQuestions);
  };

  const handleAnswerChange = (index, event) => {
    const newAnswers = [...answers];
    newAnswers[index] = event.target.value;
    setAnswers(newAnswers);
  };

  return (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <React.Fragment key={i}>
          <FormControl size="small" fullWidth sx={{mb:1}}>
            <InputLabel id={`question-label-${i}`}>
              Select Question {i + 1}
            </InputLabel>
            <Select
              size="small"
              labelId={`question-label-${i}`}
              id={`question-select-${i}`}
              value={selectedQuestions[i]}
              label={`Select Question ${i + 1}`}
              onChange={(e) => handleQuestionChange(i, e)}
              sx={{ borderRadius: 30 }}
            
            >
              {questionsList[i].map((question, idx) => (
                <MenuItem key={idx} value={question}>
                  {question}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            size="small"
            margin="normal"
            fullWidth
            placeholder="Your Answer"
            variant="outlined"
            value={answers[i]}
            onChange={(e) => handleAnswerChange(i, e)}
            InputProps={{
              sx: { borderRadius: 30, mb:2 },
            }}
          />
        </React.Fragment>
      ))}
    </>
  );
};
