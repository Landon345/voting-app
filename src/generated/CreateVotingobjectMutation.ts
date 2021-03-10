/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VotingobjectCreateInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateVotingobjectMutation
// ====================================================

export interface CreateVotingobjectMutation_createVotingobject {
  __typename: "VotingobjectSignature";
  id: string;
}

export interface CreateVotingobjectMutation {
  createVotingobject: CreateVotingobjectMutation_createVotingobject;
}

export interface CreateVotingobjectMutationVariables {
  input: VotingobjectCreateInput;
}
