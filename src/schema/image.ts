import { ObjectType, Field, Int, Resolver, Mutation } from "type-graphql";

@ObjectType()
class ImageSignature {
  @Field((_type) => Int)
  timestamp!: number;
}

@Resolver()
export class ImageResolver {
  @Mutation((_returns) => ImageSignature)
  createImageSignature(): ImageSignature {
    const timestamp = Math.round(new Date().getTime() / 1000);

    return { timestamp };
  }
}
