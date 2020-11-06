import { Arg, Ctx, Query } from "type-graphql";
import { Context } from "../types/Context";
import {
  ProductCollectionsDetailInput,
  ProductCollectionDetail,
  ProductsCollectionsDetailInput,
} from "./ProductCollection";
import {
  ProductCollectionsByTargetingInfoCollection,
  ProductCollectionsByTargetingInfoInput,
} from "./ProductCollectionByTargetingInfo";
import {
  ProductCollectionsByPetGUID,
  ProductCollectionsByPetGUIDInput,
} from "./ProductCollectionByPetGUID";
import {
  ProductCollectionPetRation,
  ProductCollectionPetRationInput,
} from "./ProductCollectionPetRation";

export class ProductCollectionResolver {
  @Query(() => [ProductCollectionsByTargetingInfoCollection], {
    nullable: true,
  })
  public async productCollectionsByTargetingInfo(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionsByTargetingInfoInput,
  ): Promise<ProductCollectionsByTargetingInfoCollection[]> {
    return (
      await ctx.omnipartners.products.getCollectionsByTargetingInfo(input)
    ).data;
  }

  @Query(() => [ProductCollectionsByPetGUID], {
    nullable: true,
  })
  public async productCollectionsByPetGUID(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionsByPetGUIDInput,
    @Arg("token") token: string,
  ): Promise<ProductCollectionsByPetGUID[]> {
    const { user_guid } = ctx.userTokenHelper.parse(token);

    const res = (
      await ctx.omnipartners.products.getCollectionsByPetGUID({
        ...input,
        user_guid,
      })
    ).data;

    return res.map((d) => new ProductCollectionsByPetGUID(d));
  }

  @Query(() => ProductCollectionPetRation, {
    nullable: true,
  })
  public async productCollectionPetRation(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionPetRationInput,
    @Arg("token") token: string,
  ): Promise<ProductCollectionPetRation | null> {
    ctx.userTokenHelper.parse(token);

    try {
      const res = (
        await ctx.omnipartners.products.getCollectionPetRation({
          ...input,
        })
      ).data;

      return new ProductCollectionPetRation(res);
    } catch (err) {
      if (err.isOmnipartnersError && err.code === "OP/OPStatusError/1984") {
        return null;
      }

      throw err;
    }
  }

  @Query(() => ProductCollectionDetail, {
    nullable: true,
  })
  public async productCollectionDetail(
    @Ctx() ctx: Context,
    @Arg("input") input: ProductCollectionsDetailInput,
    @Arg("token") token: string,
  ): Promise<ProductCollectionDetail> {
    ctx.userTokenHelper.parse(token);

    const res = (
      await ctx.omnipartners.products.getCollectionDetails({
        ...input.toOmnipartners(),
      })
    ).data;

    return new ProductCollectionDetail(res);
  }

  @Query(() => [ProductCollectionDetail], {
    nullable: true,
  })
  public async productCollectionsDetail(
    @Ctx() ctx: Context,
    @Arg("collectionsReference", () => [String]) collectionsReference: string[],
    @Arg("input") input: ProductsCollectionsDetailInput,
    @Arg("token") token: string,
  ): Promise<ProductCollectionDetail[]> {
    ctx.userTokenHelper.parse(token);

    const res = await Promise.all(
      collectionsReference.map(
        async (collectionReference) =>
          (
            await ctx.omnipartners.products.getCollectionDetails({
              ...input.toOmnipartners(),
              collection_reference: collectionReference,
            })
          ).data,
      ),
    );

    return res.map((r) => new ProductCollectionDetail(r));
  }
}
