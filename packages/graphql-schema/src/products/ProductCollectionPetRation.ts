import { InputType, Field, ObjectType } from "type-graphql";
import {
  IGetCollectionPetRationInput,
  ApproximationCodes,
  ICollectionPetRation,
} from "omnipartners";

@InputType()
export class ProductCollectionPetRationInput
  implements IGetCollectionPetRationInput {
  @Field()
  public pet_guid!: string;

  @Field({ nullable: true })
  public pet_weight?: string;

  @Field({ nullable: true })
  public pet_predicted_adult_weight?: string;

  @Field({ nullable: true })
  public pet_bcs?: string;

  @Field({ nullable: true })
  public energy_level?: string;

  @Field({ nullable: true })
  public collection_reference?: string;

  @Field({ nullable: true })
  public language?: string;
}

@ObjectType()
class ProductCollectionPetRationDebug {
  @Field()
  public exponent!: number;
  @Field()
  public constant!: number;
}

@ObjectType()
export class ProductCollectionPetRation {
  @Field(() => ProductCollectionPetRationDebug)
  public debug!: ProductCollectionPetRationDebug;

  @Field()
  public energyValue: number;

  @Field()
  public rationValue: number;

  @Field()
  public energyValueUnit: string;

  @Field()
  public rationValueUnit: string;

  @Field(() => [String])
  public approximationCodes: ApproximationCodes[];

  @Field({ nullable: true })
  public rationInCupsPerDay?: string;

  constructor(data: ICollectionPetRation) {
    Object.assign(this, data);
    this.energyValue = data.energy_value;
    this.rationValue = data.ration_value;
    this.energyValueUnit = data.energy_value_unit;
    this.rationValue = data.ration_value;
    this.rationValueUnit = data.ration_value_unit;
    this.approximationCodes = data.approximation_codes;
    this.rationInCupsPerDay = data.ration_in_cups_per_day;
  }
}
