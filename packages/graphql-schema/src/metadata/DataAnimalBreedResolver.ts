import { IMetadataAnimalBreed } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";
import yn from "yn";
import { Context } from "../types/Context";

@ObjectType()
export class AnimalBreed implements Pick<IMetadataAnimalBreed, "id" | "name"> {
  @Field()
  public id: string;

  @Field()
  public name: string;

  @Field()
  public type: string;

  @Field()
  public universe: string;

  @Field(() => Boolean)
  public get other() {
    return yn(this.data.other);
  }

  private data: IMetadataAnimalBreed;

  constructor(data: IMetadataAnimalBreed) {
    this.data = data;
    this.id = data.id;
    this.name = data.name;
    this.type = data.species;
    this.universe = data.universe;
  }
}

@Resolver(() => AnimalBreed)
export class DataAnimalBreedResolver {
  @Query(() => [AnimalBreed])
  public async metadataAnimalBreeds(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
    @Arg("type", { nullable: true }) type?: string,
  ): Promise<AnimalBreed[]> {
    return (
      await ctx.omnipartners.metadata.getAnimalBreeds({
        lang,
        type,
      })
    ).data.map((data) => new AnimalBreed(data));
  }
}
