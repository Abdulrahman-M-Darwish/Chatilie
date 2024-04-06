import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export const indices: IndicesCreateRequest[] = [
  {
    index: 'users',
    settings: {
      analysis: {
        analyzer: {
          '2_3_ngram_analyzer': {
            type: 'custom',
            filter: ['lowercase'],
            tokenizer: '2_3_ngram_tokenizer',
          },
        },
        tokenizer: {
          '2_3_ngram_tokenizer': {
            token_chars: [
              'letter',
              'digit',
              'punctuation',
              'symbol',
              'whitespace',
            ],
            min_gram: 2,
            type: 'ngram',
            max_gram: 3,
          },
        },
      },
    },
    mappings: {
      dynamic: 'strict',
      properties: {
        id: { type: 'keyword' },
        createdAt: { type: 'date' },
        updatedAt: { type: 'date' },
        name: { type: 'text' },
        birthDate: { type: 'date' },
        username: { type: 'text' },
        country: { type: 'keyword' },
        avatar: { type: 'keyword' },
        bio: { type: 'text' },
        gender: { type: 'keyword' },
        reputationOfWeek: { type: 'integer' },
        reputationOfYear: { type: 'integer' },
        reputationOfAllTime: { type: 'integer' },
      },
    },
  },
  {
    index: 'posts',
    settings: {
      analysis: {
        analyzer: {
          '2_3_ngram_analyzer': {
            type: 'custom',
            filter: ['lowercase'],
            tokenizer: '2_3_ngram_tokenizer',
          },
        },
        tokenizer: {
          '2_3_ngram_tokenizer': {
            token_chars: [
              'letter',
              'digit',
              'punctuation',
              'symbol',
              'whitespace',
            ],
            min_gram: 2,
            type: 'ngram',
            max_gram: 3,
          },
        },
      },
    },
    mappings: {
      dynamic: 'strict',
      properties: {
        id: { type: 'keyword' },
        createdAt: { type: 'date' },
        updatedAt: { type: 'date' },
        privacy: { type: 'keyword' },
        text: { type: 'text' },
        rePostedPostId: { type: 'keyword' },
        author: {
          properties: {
            id: { type: 'keyword' },
            avatar: { type: 'keyword' },
            username: { type: 'text' },
            name: { type: 'text' },
          },
        },
      },
    },
  },
];
