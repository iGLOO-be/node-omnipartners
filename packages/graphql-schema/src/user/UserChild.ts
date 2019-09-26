import { IUserChild } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserChild {
  @Field()
  public birthday: Date;

  @Field()
  public gender: string;

  @Field()
  public guid: string;

  @Field()
  public firstName: string;

  constructor(data: IUserChild) {
    Object.assign(this, data);
    this.birthday = data.child_birthday && new Date(data.child_birthday);
    this.gender = data.child_gender;
    this.guid = data.child_guid;
    this.firstName = data.child_first_name;
  }
}
