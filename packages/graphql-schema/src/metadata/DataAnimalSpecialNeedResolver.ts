import { IMetadataAnimalSpecialNeeds } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
export class AnimalSpecialNeed {
  @Field()
  public reference!: string;

  @Field()
  public name!: string;

  @Field()
  public genericName!: string;

  @Field(() => [String])
  public pathologies!: string[];

  constructor(data: IMetadataAnimalSpecialNeeds) {
    Object.assign(this, data);
    this.genericName = data.generic_name;
  }
}

@Resolver()
export class DataAnimalSpecialNeedResolver {
  @Query(() => [AnimalSpecialNeed])
  public async metadataAnimalSpecialNeeds(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<AnimalSpecialNeed[]> {
    return (
      await ctx.omnipartners.metadata.getAnimalSpecialNeeds({
        lang,
      })
    ).data.map((data) => new AnimalSpecialNeed(data));
  }
}
