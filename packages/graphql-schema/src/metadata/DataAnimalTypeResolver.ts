import { IMetadataAnimalType } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class AnimalType implements IMetadataAnimalType {
  @Field()
  public code!: string;
  @Field({ nullable: true })
  public name?: string;
}

@Resolver(() => AnimalType)
export class DataAnimalTypeResolver {
  @Query(() => [AnimalType])
  public async metadataAnimalTypes(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<AnimalType[]> {
    return (await ctx.omnipartners.metadata.getAnimalTypes({
      lang,
    })).data;
  }
}
