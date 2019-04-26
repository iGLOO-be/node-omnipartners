import { IMetadataAnimalUniverse } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class AnimalUniverse implements Partial<IMetadataAnimalUniverse> {
  @Field({ nullable: true })
  public name: string;
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
