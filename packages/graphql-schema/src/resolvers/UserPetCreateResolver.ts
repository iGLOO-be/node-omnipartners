import { IUserPetCreateInput } from "omnipartners";
import { Omit } from "type-fest";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "../types/User";
import { UserPet } from "../types/UserPet";
import { UserPetUpdateResult } from "../types/UserPetUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserPetCreateInput implements Omit<IUserPetCreateInput, "user_guid"> {
  @Field()
  public pet_name: string;
  @Field()
  public pet_type: string;
  @Field()
  public pet_breed: string;
  @Field({ nullable: true })
  public pet_breed_com_id?: string;
  @Field({ nullable: true })
  public pet_pedigreename?: string;
  @Field()
  public pet_dob: string;
  @Field({ nullable: true })
  public pet_dob_approx?: string;
  @Field({ nullable: true })
  public pet_neutered?: string;
  @Field({ nullable: true })
  public pet_neutering_date?: string;
  @Field({ nullable: true })
  public pet_gender?: string;
  @Field({ nullable: true })
  public vaccination_date?: string;
  @Field({ nullable: true })
  public pet_insured?: string;
  @Field({ nullable: true })
  public pet_medical_condition?: string;
  @Field({ nullable: true })
  public pet_lifestyle?: string;
  @Field({ nullable: true })
  public pet_brand?: string;
  @Field({ nullable: true })
  public pet_declarative_product?: string;
  @Field({ nullable: true })
  public tattoo_number?: string;
  @Field({ nullable: true })
  public chip_number?: string;
  @Field({ nullable: true })
  public pet_picture?: string;
  @Field({ nullable: true })
  public kc_number?: string;
  @Field({ nullable: true })
  public pet_ext_id?: string;
}

@Resolver(() => User)
export class UserPetCreateResolver {
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetCreate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetInput") userPetInput: UserPetCreateInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = parse(token);
    try {
      const pet = (await ctx.omnipartners.identity.createPet({
        ...userPetInput,
        user_guid,
      })).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserPetUpdateResult({
        result: {
          pet: new UserPet(pet),
          user: new User(user),
        },
      });
    } catch (err) {
      return new UserPetUpdateResult({
        error: new GenericValidationError(err),
      });
    }
  }
}
