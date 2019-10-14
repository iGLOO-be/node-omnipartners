import { IMetadataAnimalUniverse } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class AnimalUniverse implements Pick<IMetadataAnimalUniverse, "name"> {
  @Field()
  public name!: string;
}

@Resolver(() => AnimalUniverse)
export class DataAnimalUniverseResolver {
  @Query(() => [AnimalUniverse])
  public async metadataAnimalUniverses(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<AnimalUniverse[]> {
    return (await ctx.omnipartners.metadata.getAnimalUniverse({
      lang,
    })).data;
  }
}
