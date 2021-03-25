import {
  ObjectType,
  Field,
  Int,
  Resolver,
  Mutation,
  Ctx,
  Arg,
  Query,
  InputType,
} from "type-graphql";
import { Context } from "./context";
import playerdata from "playerdata.json";

@ObjectType()
class VotingobjectSignature {
  @Field((_type) => String)
  id!: string;

  @Field((_type) => String)
  category!: string;

  @Field((_type) => String)
  label!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => Int)
  rating!: number;

  @Field((_type) => Int)
  wins!: number;

  @Field((_type) => Int)
  losses!: number;
}

@InputType()
class VotingobjectCreateInput {
  @Field((_type) => String)
  id!: string;

  @Field((_type) => String)
  category!: string;

  @Field((_type) => String)
  label!: string;

  @Field((_type) => String)
  image!: string;
}

@InputType()
class VotingobjectInput {
  @Field((_type) => String)
  id!: string;

  @Field((_type) => String)
  category!: string;

  @Field((_type) => String)
  label!: string;

  @Field((_type) => String)
  image!: string;

  @Field((_type) => Int)
  rating!: number;

  @Field((_type) => Int)
  wins!: number;

  @Field((_type) => Int)
  losses!: number;
}

@Resolver()
export class VotingobjectResolver {
  @Query((_returns) => VotingobjectSignature, { nullable: true })
  async votingobject(@Arg("id") id: string, @Ctx() ctx: Context) {
    return ctx.prisma.votingobject.findOne({ where: { id: id } });
  }

  @Query((_returns) => [VotingobjectSignature], { nullable: true })
  async votingobjectsByCategory(
    @Arg("category") category: string,
    @Ctx() ctx: Context
  ) {
    return ctx.prisma.votingobject.findMany({ where: { category: category } });
  }

  @Mutation((_returns) => VotingobjectSignature)
  async createVotingobject(
    @Arg("input") input: VotingobjectCreateInput,
    @Ctx() ctx: Context
  ) {
    const inDataBaseAlready = await ctx.prisma.votingobject.findOne({
      where: { id: input.id },
    });
    if (inDataBaseAlready) {
      return inDataBaseAlready;
    }

    return await ctx.prisma.votingobject.create({
      data: {
        id: input.id,
        label: input.label,
        category: input.category,
        image: input.image,
        rating: 1000,
      },
    });
  }

  @Mutation((_returns) => VotingobjectSignature, { nullable: true })
  async updateVotingobjectRating(
    @Arg("votewinner") votewinner: string,
    @Arg("voteloser") voteloser: string,
    @Ctx() ctx: Context
  ) {
    console.log(`winner: ${votewinner} loser: ${voteloser}`);
    const winner = await ctx.prisma.votingobject.findOne({
      where: { id: votewinner },
    });
    const loser = await ctx.prisma.votingobject.findOne({
      where: { id: voteloser },
    });
    console.log("winner", winner);
    console.log("loser", loser);
    if (!winner || !loser) {
      return null;
    }
    const K = 32;

    let R1 = Math.pow(10, winner.rating / 400);
    let R2 = Math.pow(10, loser.rating / 400);

    let E1 = R1 / (R1 + R2);
    let E2 = R2 / (R1 + R2);

    let newRatingWinner = Math.ceil(winner.rating + K * (1 - E1));
    let newRatingLoser = Math.ceil(loser.rating + K * (0 - E2));

    await ctx.prisma.votingobject.update({
      where: { id: winner.id },
      data: {
        rating: newRatingWinner,
        wins: winner.wins + 1,
      },
    });

    return await ctx.prisma.votingobject.update({
      where: { id: loser.id },
      data: {
        rating: newRatingLoser,
        losses: loser.losses + 1,
      },
    });
  }
}
