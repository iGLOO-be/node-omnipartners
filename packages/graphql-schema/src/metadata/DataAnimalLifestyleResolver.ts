import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import { Context } from "../types/Context";

@ObjectType()
export class AnimalLifestyle {
  @Field()
  public code!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public species?: string;
}

@Resolver()
export class DataAnimalLifestyleResolver {
  @Query(() => [AnimalLifestyle])
  public async metadataAnimalLifestyles(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
    @Arg("type", { nullable: true }) type?: string,
  ): Promise<AnimalLifestyle[]> {
    return (
      await ctx.omnipartners.metadata.getAnimalLifestyles({
        lang,
        type,
      })
    ).data;
  }
}
