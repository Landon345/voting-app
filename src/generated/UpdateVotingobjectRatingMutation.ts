/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateVotingobjectRatingMutation
// ====================================================

export interface UpdateVotingobjectRatingMutation_updateVotingobjectRating {
  __typename: "VotingobjectSignature";
  id: string;
  label: string;
  rating: number;
}

export interface UpdateVotingobjectRatingMutation {
  updateVotingobjectRating: UpdateVotingobjectRatingMutation_updateVotingobjectRating | null;
}

export interface UpdateVotingobjectRatingMutationVariables {
  votewinner: string;
  voteloser: string;
}
