import { IUserSegment } from "omnipartners";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserSegment {
  @Field()
  public id: number;
  @Field()
  public handle: string;

  constructor(data: IUserSegment) {
    Object.assign(this, data);
    this.id = data.id;
    this.handle = data.handle;
  }
}
