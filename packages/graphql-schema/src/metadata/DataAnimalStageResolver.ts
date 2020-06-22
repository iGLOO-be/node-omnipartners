import { IMetadataAnimalStage } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
export class AnimalStage {
  @Field()
  public species!: string;

  @Field()
  public code: string;

  @Field()
  public name: string;

  constructor(data: IMetadataAnimalStage) {
    Object.assign(this, data);
    this.code = data.stage_code;
    this.name = data.stage_name;
  }
}

@Resolver(() => AnimalStage)
export class DataAnimalStageResolver {
  @Query(() => [AnimalStage])
  public async metadataAnimalStages(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
    @Arg("type", { nullable: true }) type?: string,
  ): Promise<AnimalStage[]> {
    const stages = (
      await ctx.omnipartners.metadata.getAnimalStages({
        lang,
      })
    ).data;

    if (type) {
      return stages
        .filter(stage => stage.species === type)
        .map(data => new AnimalStage(data));
    }

    return (
      await ctx.omnipartners.metadata.getAnimalStages({
        lang,
      })
    ).data.map(data => new AnimalStage(data));
  }
}
