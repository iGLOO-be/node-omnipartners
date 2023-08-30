import "reflect-metadata";

export { buildSchema, BuildSchemaOptions } from "type-graphql";

export { UserLoginByPublicTokenResolver } from "./user/UserLoginByPublicTokenResolver";
export { DataAnimalBreedResolver } from "./metadata/DataAnimalBreedResolver";
export { DataAnimalTypeResolver } from "./metadata/DataAnimalTypeResolver";
export { DataAnimalUniverseResolver } from "./metadata/DataAnimalUniverseResolver";
export { DataCountryResolver } from "./metadata/DataCountryResolver";
export { DataPlaceOfPurchaseResolver } from "./metadata/DataPlaceOfPurchaseResolver";
export { DataInterestResolver } from "./metadata/DataInterestResolver";
export { DataLanguageResolver } from "./metadata/DataLanguageResolver";
export { DataLegalFormResolver } from "./metadata/DataLegalFormResolver";
export { DataSubscriptionResolver } from "./metadata/DataSubscriptionResolver";
export { DataUserTitleResolver } from "./metadata/DataUserTitleResolver";
export { DataAnimalPathologiesResolver } from "./metadata/DataAnimalPathologyResolver";
export * from "./metadata/DataPartnerRelationTypesResolver";
export * from "./metadata/DataAccountPasswordPolicyResolver";
export { DataPartnerTypeResolver } from "./metadata/DataPartnerTypeResolver";
export { DealResolver, DealSubscribeInput } from "./resolvers/DealResolver";
export { ProductCollectionResolver } from "./products/ProductCollectionResolver";
export * from "./types/Context";
export * from "./types/GenericResult";
export * from "./types/GenericValidationError";
export { UserAddressCreateResolver } from "./user/UserAddressCreateResolver";
export { UserAddressUpdateResolver } from "./user/UserAddressUpdateResolver";
export { UserCreateResolver } from "./user/UserCreateResolver";
export { UserPetCreateResolver } from "./user/UserPetCreateResolver";
export { UserPetDeleteResolver } from "./user/UserPetDeleteResolver";
export { UserPetUpdateResolver } from "./user/UserPetUpdateResolver";
export { UserResolver, userDataOptions } from "./user/UserResolver";
export {
  UserPartnerRelation,
  UserPartnerRelations,
} from "./user/UserPartnerRelations";
export { UserUpdateResolver } from "./user/UserUpdateResolver";
export { UserChildUpdateResolver } from "./user/UserChildUpdateResolver";
export { UserChildCreateResolver } from "./user/UserChildCreateResolver";
export { UserPublicSubscriptions } from "./user/UserPublicSubscriptions";
export { PartnerLocatorResolver } from "./partner/PartnerLocatorResolver";
export { Partner } from "./partner/Partner";
export * from "./partner/PartnerListItem";
export { PartnerListItemResolver } from "./partner/ParnerListItemResolver";
export { AuthenticationError } from "./lib/AuthenticationError";
export { LoyaltyResolver } from "./resolvers/LoyaltyResolver";

export * from "./user/UserFavouritesResolver";
export * from "./user/UserFavourites";
export * from "./user/UserFavouritesResult";
export * from "./user/UserResult";

export * from "./schema";
export * from "./utils";
export * from "./connections";
export * from "./user/User";
export * from "./deals/Deal";
