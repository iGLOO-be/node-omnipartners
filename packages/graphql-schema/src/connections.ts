import { ArgsType, Field, ObjectType } from "type-graphql";

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  public hasNextPage?: boolean;
  @Field()
  public count?: number;
  @Field()
  public page?: number;
  @Field({ nullable: true, description: "Paginate limit" })
  public limit?: number;
}

@ArgsType()
export class ConnectionArgs {
  @Field({ nullable: true, description: "Paginate limit" })
  public limit?: number;
  @Field({ nullable: true })
  public page?: number | null;
}
