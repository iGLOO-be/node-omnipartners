import { IMetadataLegalForm } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class LegalForm implements IMetadataLegalForm {
  @Field()
  public code!: string;
  @Field()
  public name!: string;
  @Field({ nullable: true })
  public description?: string | null;
  @Field()
  public forget_on_revoke!: boolean;
  @Field({ nullable: true })
  public url?: string | null;
}

@Resolver(() => LegalForm)
export class DataLegalFormResolver {
  @Query(() => [LegalForm])
  public async metadataLegalForms(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
    @Arg("codes", { nullable: true }) codes?: string,
  ): Promise<LegalForm[]> {
    return (await ctx.omnipartners.metadata.getLegalForms({
      lang,
      legal_form_codes: codes,
    })).data;
  }
}
