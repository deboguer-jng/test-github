import { graphql } from '@octokit/graphql';
import appConf from '../config';

export type User = {
  id: string;
  login: string;
  name: string;
  url: string;
  avatarUrl: string;
  createdAt: string;
};

export type QueryResult = {
  search: {
    nodes: User[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  };
};

const query = `
  query($cursor: String) {
    search(query: "type:user is:public", type: USER, first: 50, after: $cursor) {
      nodes {
        ... on User {
          id
          login
          name
          url
          avatarUrl
          createdAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const getUsers = async (offset?: string): Promise<QueryResult> => {
  const result = await graphql<QueryResult>(query, { cursor: offset, headers: { authorization: `token ${appConf.token}` } });

  return result;
};