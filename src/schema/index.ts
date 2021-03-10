import { buildSchemaSync, Resolver, Query } from "type-graphql";
import { VotingobjectResolver } from "./votingobject";

@Resolver()
class DummyResolver {
  @Query((_returns) => String)
  hello() {
    return "Nice to meet you!";
  }
}

export const schema = buildSchemaSync({
  resolvers: [DummyResolver, VotingobjectResolver],
  emitSchemaFile: process.env.NODE_ENV === "development",
});
