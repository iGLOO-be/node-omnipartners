import { IMetadataMemberLanguage } from "omnipartners";
import { Arg, Ctx, Field, ObjectType, Query, Resolver } from "type-graphql";

import { Context } from "../types/Context";

@ObjectType()
export class Language implements IMetadataMemberLanguage {
  @Field({ nullable: true })
  public name: string;
  @Field()
  public code: string;
}

@Resolver(() => Language)
export class DataLanguageResolver {
  @Query(() => [Language])
  public async metadataLanguages(
    @Ctx() ctx: Context,
    @Arg("lang", { nullable: true }) lang?: string,
  ): Promise<Language[]> {
    const languages = (await ctx.omnipartners.metadata.getMemberLanguages({
      lang,
    })).data;

    return languages.map(l => ({
      ...l,
      code: l.code.toLowerCase(),
    }));
  }
}
