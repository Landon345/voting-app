import { useMutation, gql, useQuery } from "@apollo/client";

const VOTING_OBJECT_QUERY = gql`
  query VotingobjectQuery($id: String!) {
    votingobject(id: $id) {
      id
      rating
    }
  }
`;

const VOTING_OBJECT_QUERY_BY_CATEGORY = gql`
  query VotingobjectQueryByCategory($category: String!) {
    votingobjectsByCategory(category: $category) {
      id
      label
      image
      wins
      losses
      rating
    }
  }
`;

const CREATE_VOTINGOBJECT_MUTATION = gql`
  mutation CreateVotingobjectMutation($input: VotingobjectCreateInput!) {
    createVotingobject(input: $input) {
      id
    }
  }
`;

const UPDATE_VOTINGOBJECT_RATING_MUTATION = gql`
  mutation UpdateVotingobjectRatingMutation(
    $votewinner: String!
    $voteloser: String!
  ) {
    updateVotingobjectRating(votewinner: $votewinner, voteloser: $voteloser) {
      id
      label
      rating
    }
  }
`;

export {
  VOTING_OBJECT_QUERY,
  VOTING_OBJECT_QUERY_BY_CATEGORY,
  UPDATE_VOTINGOBJECT_RATING_MUTATION,
  CREATE_VOTINGOBJECT_MUTATION,
};
