import { IMetadataAnimalPathology } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import yn from "yn";
import { Context } from "../types/Context";

@ObjectType()
export class AnimalPathology
  implements Pick<IMetadataAnimalPathology, "code" | "name" | "species"> {
  @Field()
  public code!: string;

  @Field()
  public name!: string;

  @Field({ nullable: true })
  public species!: string;

  @Field()
  public hasDedicatedProduct: boolean;

  constructor(data: IMetadataAnimalPathology) {
    Object.assign(this, data);
    this.hasDedicatedProduct = !!yn(data.has_dedicated_product);
  }
}

@Resolver()
export class DataAnimalPathologiesResolver {
  @Query(() => [AnimalPathology])
  public async metadataAnimalPathologiess(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<AnimalPathology[]> {
    return (
      await ctx.omnipartners.metadata.getAnimalPathologies({
        lang,
      })
    ).data.map(data => new AnimalPathology(data));
  }
}
