import { graphql } from '@octokit/graphql';
import appConf from '../config';

export type Repository = {
  id: string;
  name: string;
  url: string;
  homepageUrl: string;
  createdAt: string;
};

export type QueryResult = {
  search: {
    nodes: Repository[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string;
    };
  }
};

const getRepos = async (offset?: string): Promise<QueryResult> => {
  const query = `
    query($cursor: String) {
      search(query: "is:public", type: REPOSITORY, first: 50, after: $cursor) {
        nodes {
          ... on Repository {
            id
            name
            homepageUrl
            url
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
  const result = await graphql<QueryResult>(query, { cursor: offset, headers: { authorization: `token ${appConf.token}` } }) 

  return result
}

export default getRepos;
