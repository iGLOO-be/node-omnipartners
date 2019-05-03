import {
  buildSchema as typeGraphqlBuildschema,
  BuildSchemaOptions,
} from "type-graphql";
import { DataAnimalBreedResolver } from "./metadata/DataAnimalBreedResolver";
import { DataAnimalTypeResolver } from "./metadata/DataAnimalTypeResolver";
import { DataAnimalUniverseResolver } from "./metadata/DataAnimalUniverseResolver";
import { DataCountryResolver } from "./metadata/DataCountryResolver";
import { DataLanguageResolver } from "./metadata/DataLanguageResolver";
import { DataLegalFormResolver } from "./metadata/DataLegalFormResolver";
import { DataSubscriptionResolver } from "./metadata/DataSubscriptionResolver";
import { DataUserTitleResolver } from "./metadata/DataUserTitleResolver";
import { DealResolver } from "./resolvers/DealResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { UserAddressCreateResolver } from "./user/UserAddressCreateResolver";
import { UserAddressUpdateResolver } from "./user/UserAddressUpdateResolver";
import { UserCreateResolver } from "./user/UserCreateResolver";
import { UserPetCreateResolver } from "./user/UserPetCreateResolver";
import { UserPetUpdateResolver } from "./user/UserPetUpdateResolver";
import { UserResolver } from "./user/UserResolver";
import { UserUpdateResolver } from "./user/UserUpdateResolver";

export const buildFullSchema = async (options?: Partial<BuildSchemaOptions>) =>
  typeGraphqlBuildschema({
    resolvers: [
      UserResolver,
      UserCreateResolver,
      UserUpdateResolver,
      UserPetCreateResolver,
      UserPetUpdateResolver,
      UserAddressCreateResolver,
      UserAddressUpdateResolver,
      DataCountryResolver,
      DataAnimalBreedResolver,
      DataAnimalTypeResolver,
      DataAnimalUniverseResolver,
      DataLanguageResolver,
      DataSubscriptionResolver,
      DataUserTitleResolver,
      DataLegalFormResolver,
      DealResolver,
      ProductResolver,
    ],
    ...options,
  });