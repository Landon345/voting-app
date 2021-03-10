/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: VotingobjectQuery
// ====================================================

export interface VotingobjectQuery_votingobject {
  __typename: "VotingobjectSignature";
  id: string;
  rating: number;
}

export interface VotingobjectQuery {
  votingobject: VotingobjectQuery_votingobject | null;
}

export interface VotingobjectQueryVariables {
  id: string;
}
