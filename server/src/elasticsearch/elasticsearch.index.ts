import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export const indices: IndicesCreateRequest[] = [
  {
    index: 'users',
    mappings: {
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
    mappings: {
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
