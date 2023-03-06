import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { CreateCompletionRequest } from 'openai/dist/api';
import { EssayGeneratorDto } from './dtos/essay-generator.dto';
import { GenerateStudyNotesDto } from './dtos/generate-study-notes.dto';
import { GrammarCorrectionDto } from './dtos/grammar-correction.dto';

@Injectable()
export class GeneratorsService {
  private readonly openAi: OpenAIApi;
  constructor(private readonly configService: ConfigService) {
    const configuration = new Configuration({
      organization: configService.get<string>('OPENAI_ORG_ID'),
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
    this.openAi = new OpenAIApi(configuration);
  }

  async generateStudyNotes({ points, subject }: GenerateStudyNotesDto) {
    try {
      const params: CreateCompletionRequest = {
        model: 'text-davinci-003',
        prompt: `What are ${points} key points I should know when studying ${subject}?`,
        max_tokens: 2000,
        temperature: 0.3,
      };
      const response = await this.openAi.createCompletion(params);
      return response.data.choices[0];
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async grammarCorrection({ prompt }: GrammarCorrectionDto) {
    try {
      const params: CreateCompletionRequest = {
        model: 'text-davinci-003',
        prompt: `Correct it for me grammatically for the language in which it was written: ${prompt}`,
        max_tokens: 2000,
        temperature: 0.7,
      };
      const response = await this.openAi.createCompletion(params);
      return response.data.choices[0];
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }

  async essayGenerator({ sentences, subject }: EssayGeneratorDto) {
    try {
      console.log(sentences);
      console.log(subject);
      const params: CreateCompletionRequest = {
        model: 'text-davinci-002',
        prompt: `Generate me creative essay consisting of ${sentences} sentences on the topic of: "${subject}"`,
        max_tokens: 2000,
        temperature: 0.3,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      };
      const response = await this.openAi.createCompletion(params);
      return response.data.choices[0];
    } catch (err) {
      console.log(err);
      throw new Error(err.message);
    }
  }
}
