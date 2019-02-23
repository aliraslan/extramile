import { Field, Float, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType("LonLat")
export class Point {
  // DONT CHANGE THIS.
  // as the typeorm point expects fields of name x and y. DONT CHANGE THE NAMES
  // and DONT ADD the name property in the field for both x and y as
  // any change would either result in a lot of transformation before either inserting
  // into the Database or parsing the result form the database or in each resolver
  // that expects an argument of time Point/LonLat or all of the above

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