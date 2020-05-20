import {
  buildSchema as typeGraphqlBuildschema,
  BuildSchemaOptions,
} from "type-graphql";
import { DirectCashbackRedemptionRequestResolver } from "./directCashback/DirectCashbackRedemptionRequestResolver";
import { DirectCashbackResolver } from "./directCashback/DirectCashbackResolver";
import { DirectCashbackVoucherResolver } from "./directCashback/DirectCashbackVoucherResolver";
import { DataAnimalBreedResolver } from "./metadata/DataAnimalBreedResolver";
import { DataAnimalTypeResolver } from "./metadata/DataAnimalTypeResolver";
import { DataAnimalUniverseResolver } from "./metadata/DataAnimalUniverseResolver";
import { DataCountryResolver } from "./metadata/DataCountryResolver";
import { DataLanguageResolver } from "./metadata/DataLanguageResolver";
import { DataLegalFormResolver } from "./metadata/DataLegalFormResolver";
import { DataPartnerTypeResolver } from "./metadata/DataPartnerTypeResolver";
import { DataPlaceOfPurchaseResolver } from "./metadata/DataPlaceOfPurchaseResolver";
import { DataSubscriptionResolver } from "./metadata/DataSubscriptionResolver";
import { DataUserTitleResolver } from "./metadata/DataUserTitleResolver";
import { PartnerListItemResolver } from "./partner/ParnerListItemResolver";
import { PartnerLocatorResolver } from "./partner/PartnerLocatorResolver";
import { PartnerResolver } from "./partner/PartnerResolver";
import { DealResolver } from "./resolvers/DealResolver";
import { UserAddressCreateResolver } from "./user/UserAddressCreateResolver";
import { UserAddressUpdateResolver } from "./user/UserAddressUpdateResolver";
import { UserChildCreateResolver } from "./user/UserChildCreateResolver";
import { UserChildUpdateResolver } from "./user/UserChildUpdateResolver";
import { UserCreateResolver } from "./user/UserCreateResolver";
import {
  UserFavouritesCreateResolver,
  UserFavouritesDeleteResolver,
} from "./user/UserFavouritesResolver";
import { UserPartnerRelationCreateResolver } from "./user/UserPartnerRelationCreateResolver";
import { UserPartnerRelationDeleteResolver } from "./user/UserPartnerRelationDeleteResolver";
import { UserPetCreateResolver } from "./user/UserPetCreateResolver";
import { UserPetDeleteResolver } from "./user/UserPetDeleteResolver";
import { UserPetUpdateResolver } from "./user/UserPetUpdateResolver";
import { UserResolver } from "./user/UserResolver";
import { UserUpdateResolver } from "./user/UserUpdateResolver";
import { ProductCollectionResolver } from "./products/ProductCollectionResolver";
import { DataAccountPasswordPolicyResolver } from "./metadata/DataAccountPasswordPolicyResolver";
import { DataAnimalPathologiesResolver } from "./metadata/DataAnimalPathologyResolver";

export const buildFullSchema = async (options?: Partial<BuildSchemaOptions>) =>
  typeGraphqlBuildschema({
    resolvers: [
      UserResolver,
      UserCreateResolver,
      UserUpdateResolver,
      UserPetCreateResolver,
      UserPetDeleteResolver,
      UserPetUpdateResolver,
      UserAddressCreateResolver,
      UserAddressUpdateResolver,
      UserPartnerRelationCreateResolver,
      UserPartnerRelationDeleteResolver,
      DataCountryResolver,
      DataPlaceOfPurchaseResolver,
      DataAnimalBreedResolver,
      DataAnimalTypeResolver,
      DataAnimalUniverseResolver,
      DataLanguageResolver,
      DataSubscriptionResolver,
      DataUserTitleResolver,
      DataLegalFormResolver,
      DealResolver,
      ProductCollectionResolver,
      PartnerLocatorResolver,
      PartnerResolver,
      PartnerListItemResolver,
      DirectCashbackVoucherResolver,
      DirectCashbackResolver,
      DirectCashbackRedemptionRequestResolver,
      UserChildUpdateResolver,
      UserChildCreateResolver,
      UserFavouritesCreateResolver,
      UserFavouritesDeleteResolver,
      DataPartnerTypeResolver,
      DataAccountPasswordPolicyResolver,
      DataAnimalPathologiesResolver
    ],
    ...options,
  });
