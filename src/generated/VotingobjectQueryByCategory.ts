/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VotingobjectQueryByCategory
// ====================================================

export interface VotingobjectQueryByCategory_votingobjectsByCategory {
  __typename: "VotingobjectSignature";
  id: string;
  label: string;
  image: string;
  wins: number;
  losses: number;
  rating: number;
}

export interface VotingobjectQueryByCategory {
  votingobjectsByCategory: VotingobjectQueryByCategory_votingobjectsByCategory[] | null;
}

export interface VotingobjectQueryByCategoryVariables {
  category: string;
}
