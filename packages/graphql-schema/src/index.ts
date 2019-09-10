import "reflect-metadata";

export { buildSchema, BuildSchemaOptions } from "type-graphql";

export { DataAnimalBreedResolver } from "./metadata/DataAnimalBreedResolver";
export { DataAnimalTypeResolver } from "./metadata/DataAnimalTypeResolver";
export {
  DataAnimalUniverseResolver,
} from "./metadata/DataAnimalUniverseResolver";
export { DataCountryResolver } from "./metadata/DataCountryResolver";
export {
  DataPlaceOfPurchaseResolver,
} from "./metadata/DataPlaceOfPurchaseResolver";
export { DataLanguageResolver } from "./metadata/DataLanguageResolver";
export { DataLegalFormResolver } from "./metadata/DataLegalFormResolver";
export { DataSubscriptionResolver } from "./metadata/DataSubscriptionResolver";
export { DataUserTitleResolver } from "./metadata/DataUserTitleResolver";
export { DealResolver } from "./resolvers/DealResolver";
export { ProductResolver } from "./resolvers/ProductResolver";
export * from "./types/Context";
export * from "./types/GenericResult";
export * from "./types/GenericValidationError";
export { UserAddressCreateResolver } from "./user/UserAddressCreateResolver";
export { UserAddressUpdateResolver } from "./user/UserAddressUpdateResolver";
export { UserCreateResolver } from "./user/UserCreateResolver";
export { UserPetCreateResolver } from "./user/UserPetCreateResolver";
export { UserPetUpdateResolver } from "./user/UserPetUpdateResolver";
export { UserResolver } from "./user/UserResolver";
export { UserUpdateResolver } from "./user/UserUpdateResolver";
export { PartnerLocatorResolver } from "./partner/PartnerLocatorResolver";
export { AuthenticationError } from "./lib/UserTokenHelper";

export * from "./schema";
export * from "./utils";
export * from "./connections";
