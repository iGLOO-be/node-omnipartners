import "reflect-metadata";

import { buildSchema, BuildSchemaOptions } from "type-graphql";
import { DataAnimalBreedResolver } from "./resolvers/DataAnimalBreedResolver";
import { DataAnimalTypeResolver } from "./resolvers/DataAnimalTypeResolver";
import { DataAnimalUniverseResolver } from "./resolvers/DataAnimalUniverseResolver";
import { DataCountryResolver } from "./resolvers/DataCountryResolver";
import { DataLanguageResolver } from "./resolvers/DataLanguageResolver";
import { DataLegalFormResolver } from "./resolvers/DataLegalFormResolver";
import { DataSubscriptionResolver } from "./resolvers/DataSubscriptionResolver";
import { DataUserTitleResolver } from "./resolvers/DataUserTitleResolver";
import { DealResolver } from "./resolvers/DealResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { UserAddressCreateResolver } from "./resolvers/UserAddressCreateResolver";
import { UserAddressUpdateResolver } from "./resolvers/UserAddressUpdateResolver";
import { UserCreateResolver } from "./resolvers/UserCreateResolver";
import { UserPetCreateResolver } from "./resolvers/UserPetCreateResolver";
import { UserPetUpdateResolver } from "./resolvers/UserPetUpdateResolver";
import { UserResolver } from "./resolvers/UserResolver";
import { UserUpdateResolver } from "./resolvers/UserUpdateResolver";
import { Context } from "./types/Context";

const createSchema = async (options?: Partial<BuildSchemaOptions>) =>
  buildSchema({
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

export { Context, createSchema };
