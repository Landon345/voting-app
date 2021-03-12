import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "src/components/layout";
import { valueToObjectRepresentation } from "@apollo/client/utilities";

import {
  VotingobjectQuery,
  VotingobjectQueryVariables,
} from "src/generated/VotingobjectQuery";

import {
  CreateVotingobjectMutation,
  CreateVotingobjectMutationVariables,
} from "src/generated/CreateVotingobjectMutation";

import {
  UpdateVotingobjectRatingMutation,
  UpdateVotingobjectRatingMutationVariables,
} from "src/generated/UpdateVotingobjectRatingMutation";

const VOTING_OBJECT_QUERY = gql`
  query VotingobjectQuery($id: String!) {
    votingobject(id: $id) {
      id
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

function Foods() {
  const {
    query: { foods },
  } = useRouter();
  const [differentRecipes, setdifferentRecipes] = useState<any>(null);
  const [food1, setFood1] = useState<any>(null);
  const [food2, setFood2] = useState<any>(null);

  const { loading: l1, data: d1, error: e1, refetch: r1 } = useQuery<
    VotingobjectQuery,
    VotingobjectQueryVariables
  >(VOTING_OBJECT_QUERY, {
    variables: { id: food1 && food1.uri.split("#")[1] },
    skip: food1 == null,
  });
  const { loading: l2, data: d2, error: e2, refetch: r2 } = useQuery<
    VotingobjectQuery,
    VotingobjectQueryVariables
  >(VOTING_OBJECT_QUERY, {
    variables: { id: food2 && food2.uri.split("#")[1] },
    skip: food2 == null,
  });

  const [createVotingObject] = useMutation<
    CreateVotingobjectMutation,
    CreateVotingobjectMutationVariables
  >(CREATE_VOTINGOBJECT_MUTATION);

  const [updateVotingObjectRating] = useMutation<
    UpdateVotingobjectRatingMutation,
    UpdateVotingobjectRatingMutationVariables
  >(UPDATE_VOTINGOBJECT_RATING_MUTATION);

  useEffect(() => {
    fetchData();
  }, [foods]);
  const fetchData = async () => {
    console.log("food :>> ", foods);
    const response = await fetch(
      `https://api.edamam.com/search?q=${foods}&app_id=c6a39b66&app_key=7fa17291b090e19347fea15eb12f09c8&to=50`
    );
    const data = await response.json();
    console.log("data :>> ", data);
    setdifferentRecipes(data.hits);
    PickRandom(data.hits);
  };

  const PickRandom = async (hits: any) => {
    let ran1 = Math.floor(Math.random() * hits.length);
    let ran2 = Math.floor(Math.random() * hits.length);
    let tried = 0;
    while (ran1 == ran2 && tried <= 10) {
      ran2 = Math.floor(Math.random() * hits.length);
      tried++;
    }
    setFood1(hits[ran1].recipe);
    setFood2(hits[ran2].recipe);
  };

  const vote = async (winner: any, loser: any) => {
    PickRandom(differentRecipes);
    // before updating rating, check if food is in database.
    await checkforAndCreate(winner, loser);
    // make api request to give a better elo score to winner.
    // vote winner and loser should just be there ids
    const winnerid = winner.uri.split("#")[1];
    const loserid = loser.uri.split("#")[1];

    const { data } = await updateVotingObjectRating({
      variables: {
        votewinner: winnerid,
        voteloser: loserid,
      },
    });
  };

  const checkforAndCreate = async (f1: any, f2: any) => {
    await r1();
    await r2();

    if (d1?.votingobject && d2?.votingobject) {
      return;
    }
    if (!d1?.votingobject?.id) {
      const f1Id = f1.uri.split("#")[1];
      await handlecreate(f1Id, foods as any, f1.image, f1.label);
    }
    if (!d2?.votingobject?.id) {
      const f2Id = f2.uri.split("#")[1];
      await handlecreate(f2Id, foods as any, f2.image, f2.label);
    }
  };

  const handlecreate = async (
    id: string,
    category: string,
    image: string,
    label: string
  ) => {
    const { data } = await createVotingObject({
      variables: {
        input: {
          id,
          category,
          image,
          label,
        },
      },
    });
  };
  return (
    <>
      <div className="text-4xl text-gray-800 text-center p-10">Choose One</div>
      <div className="flex content-start h-48 flex-wrap pt-3">
        {food1 && food2 && (
          <>
            <div
              className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
              onClick={() => vote(food1, food2)}
            >
              {food1.label}
              <img
                src={food1.image}
                alt="food"
                className="object-contain rounded-md"
              />
            </div>

            <div
              className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
              onClick={() => vote(food2, food1)}
            >
              {food2.label}
              <img
                src={food2.image}
                alt="food"
                className="object-contain rounded-md"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Foods;
