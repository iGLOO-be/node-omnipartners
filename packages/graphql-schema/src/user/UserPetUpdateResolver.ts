import { IUserPetUpdateInput } from "omnipartners";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import { parse } from "../lib/userToken";
import { Context } from "../types/Context";
import { GenericValidationError } from "../types/GenericValidationError";
import { User } from "./User";
import { UserPet } from "./UserPet";
import { UserPetUpdateResult } from "./UserPetUpdateResult";
import { dataOptions } from "./UserResolver";

@InputType()
class UserPetUpdateInput implements IUserPetUpdateInput {
  @Field()
  public pet_guid: string;
  @Field({ nullable: true })
  public pet_name?: string;
  @Field({ nullable: true })
  public pet_type?: string;
  @Field({ nullable: true })
  public pet_breed?: string;
  @Field({ nullable: true })
  public pet_pedigreename?: string;
  @Field({ nullable: true })
  public pet_breed_com_id?: string;
  @Field({ nullable: true })
  public pet_dob?: string;
  @Field({ nullable: true })
  public pet_dob_approx?: string;
  @Field({ nullable: true })
  public pet_gender?: string;
  @Field({ nullable: true })
  public pet_neutered?: string;
  @Field({ nullable: true })
  public pet_neutering_date?: string;
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
  public kc_number?: string;
  @Field({ nullable: true })
  public pet_picture?: string;
  @Field({ nullable: true })
  public pet_ext_id?: string;
}

@Resolver(() => User)
export class UserPetUpdateResolver {
  @Mutation(() => UserPetUpdateResult, { nullable: false })
  public async userPetUpdate(
    @Ctx() ctx: Context,
    @Arg("token") token: string,
    @Arg("userPetInput") userPetInput: UserPetUpdateInput,
  ): Promise<UserPetUpdateResult> {
    const { user_guid } = parse(token);
    try {
      const pet = (await ctx.omnipartners.identity.getPet({
        pet_guid: userPetInput.pet_guid,
      })).data;

      if (pet.pet_owner.user_guid !== user_guid) {
        // TODO: better error
        throw new Error("Not your pet!");
      }

      const updatedPet = (await ctx.omnipartners.identity.updatePet(
        userPetInput,
      )).data;
      const user = await ctx.omnipartners.identity.authenticateByGUID({
        data_options: dataOptions,
        user_guid,
      });
      return new UserPetUpdateResult({
        result: {
          pet: new UserPet(updatedPet),
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
