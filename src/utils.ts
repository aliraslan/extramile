import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType("LonLat")
export class Point {
  // DONT CHANGE THIS.
  // as the typeorm point expects fields of name x and y. DONT CHANGE THE NAMES
  // and DONT ADD the name property in the field for both x and y as
  // any change would either result in having to change the transformer field in
  // in every model where the Point type is used.

  /** @name x
   *  @description longitude
   */
  @Field(() => Float, { description: "longitude" })
  x: number;

  /** @name y
   *  @description latitude
   */
  @Field(() => Float, { description: "latitude" })
  y: number;
}

// Input type used to let graphql know that we want to use it as an argument in our queries and mutations
@InputType("TripStopInput")
export class TripStopInput {
  @Field(() => Point)
  location: Point;

  @Field()
  address: number;
}

// ObjectType tells graphql that we want to return this object as Field in our queries
@ObjectType()
export class TripLocation {
  @Field(() => ID)
  id: number;

  @Field(() => Point)
  location: Point;

  @Field(() => Date)
  date: Date;
}

export interface LocationPayload {
  id: number;
  location: Point;
}

export type Lazy<T extends object> = Promise<T> | T;