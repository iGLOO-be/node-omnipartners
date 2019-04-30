import * as Relay from "graphql-relay";
import { ArgsType, Field, ObjectType } from "type-graphql";

export type ConnectionCursor = Relay.ConnectionCursor;

@ObjectType()
export class PageInfo {
  @Field(() => Boolean)
  public hasNextPage?: boolean | null;
  @Field(of => String, { nullable: true })
  public nextMarker?: ConnectionCursor | null;
}

@ArgsType()
export class ConnectionArgs {
  @Field({ nullable: true, description: "Paginate next marker" })
  public nextMarker?: ConnectionCursor;
  @Field({ nullable: true, description: "Paginate limit" })
  public limit?: number;
}

export {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromArraySlice,
  connectionFromPromisedArraySlice,
} from "graphql-relay";
