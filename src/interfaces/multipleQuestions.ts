// export interface IMultipleQuestions  {
//     id: number;
//     question: string;
//     options: string[];
//     correct: string;
//   };
  
export interface IMultipleQuestions {
  id: string; // `id` is a string
  question: string;
  options: string[];
  correct: string; // `correctAnswer` instead of `correct`
}