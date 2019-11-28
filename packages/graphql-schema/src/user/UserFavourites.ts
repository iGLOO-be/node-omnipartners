import { IUserFavourites } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserFavourites {
  @Field()
  public id: string;

  @Field()
  public date!: string;

  @Field()
  public type!: string;

  @Field()
  public content!: string;

  @Field()
  public source!: string;

  constructor(data: IUserFavourites) {
    Object.assign(this, data);
    this.id = data.content_id;
  }
}
