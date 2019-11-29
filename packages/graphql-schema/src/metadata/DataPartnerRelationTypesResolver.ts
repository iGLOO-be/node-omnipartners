import { IMetadataPartnerRelationType } from "omnipartners";
import { Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class PartnerRelation implements IMetadataPartnerRelationType {
  @Field()
  public code!: string;
  @Field()
  public name!: string;
}

@Resolver(() => PartnerRelation)
export class DataPartnerRelationTypesResolver {
  @Query(() => [PartnerRelation])
  public async metadataPartnerRelationTypes(
    @Ctx() ctx: Context,
  ): Promise<PartnerRelation[]> {
    return (await ctx.omnipartners.metadata.getPartnerRelationTypes()).data;
  }
}
