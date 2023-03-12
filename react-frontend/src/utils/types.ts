export type User = {
  _id: string;
  username: string;
};

export type SignInUserParams = {
  username: string;
  password: string;
};

export type StudyNotesParams = {
  points: number;
  subject: string;
};
export type GrammarCorrectionParams = {
  prompt: string;
};
export type EssayGeneratorParams = {
  sentences: number;
  subject: string;
};

export type GoogleAuthParams = {
  token?: string;
};
