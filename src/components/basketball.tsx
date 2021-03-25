import React, { useState, useEffect } from "react";
import { useMutation, gql, useQuery } from "@apollo/client";
import PlayerData from "playerdata.json";
import {
  VOTING_OBJECT_QUERY_BY_CATEGORY,
  CREATE_VOTINGOBJECT_MUTATION,
  UPDATE_VOTINGOBJECT_RATING_MUTATION,
} from "src/components/mutations";
import { useRouter } from "next/router";

import {
  VotingobjectQuery,
  VotingobjectQueryVariables,
} from "src/generated/VotingobjectQuery";

import {
  VotingobjectQueryByCategory,
  VotingobjectQueryByCategoryVariables,
} from "src/generated/VotingobjectQueryByCategory";

import {
  CreateVotingobjectMutation,
  CreateVotingobjectMutationVariables,
} from "src/generated/CreateVotingobjectMutation";

import {
  UpdateVotingobjectRatingMutation,
  UpdateVotingobjectRatingMutationVariables,
} from "src/generated/UpdateVotingobjectRatingMutation";

function Basketball() {
  const {
    query: { PeriodOfTime },
  } = useRouter();
  const [player1, setplayer1] = useState<any>(null);
  const [player2, setplayer2] = useState<any>(null);

  const { loading: l1, data: d1, error: e1, refetch: r1 } = useQuery<
    VotingobjectQueryByCategory,
    VotingobjectQueryByCategoryVariables
  >(VOTING_OBJECT_QUERY_BY_CATEGORY, {
    variables: { category: "basketball" },
  });

  const [createVotingObject] = useMutation<
    CreateVotingobjectMutation,
    CreateVotingobjectMutationVariables
  >(CREATE_VOTINGOBJECT_MUTATION);

  const [updateVotingObjectRating] = useMutation<
    UpdateVotingobjectRatingMutation,
    UpdateVotingobjectRatingMutationVariables
  >(UPDATE_VOTINGOBJECT_RATING_MUTATION);

  const PickRandom = async (hits: any) => {
    console.log("hits :>> ", hits);
    let ran1 = Math.floor(Math.random() * hits.length);
    let ran2 = Math.floor(Math.random() * hits.length);
    let tried = 0;
    while (ran1 == ran2 && tried <= 10) {
      ran2 = Math.floor(Math.random() * hits.length);
      tried++;
    }
    setplayer1(hits[ran1]);
    setplayer2(hits[ran2]);
  };

  const vote = async (winner: any, loser: any) => {
    PickRandom(d1?.votingobjectsByCategory);

    const { data } = await updateVotingObjectRating({
      variables: {
        votewinner: winner.id,
        voteloser: loser.id,
      },
    });
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
  if (!d1?.votingobjectsByCategory) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="text-4xl text-gray-800 text-center p-10">
        <div>Choose One</div>

        {!player1 && (
          <button
            onClick={() => PickRandom(d1?.votingobjectsByCategory)}
            className="text-center border-gray-500 p-5 text-lg border bg-purple-200 rounded-xl outline-none"
          >
            Start
          </button>
        )}
      </div>

      <div className="flex content-start h-48 flex-wrap pt-3">
        {player1 && player2 && (
          <>
            <div
              className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
              onClick={() => vote(player1, player2)}
            >
              {player1.label} | {player1.rating}
              <img
                src={player1.image}
                alt="player"
                className="object-contain rounded-md"
              />
            </div>

            <div
              className="p-8 ml-6 bg-purple-400 rounded-xl text-white cursor-pointer hover:bg-red-400"
              onClick={() => vote(player2, player1)}
            >
              {player2.label} | {player2.rating}
              <img
                src={player2.image}
                alt="player"
                className="object-contain rounded-md"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Basketball;
