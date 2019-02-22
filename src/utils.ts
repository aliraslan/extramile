import { Field, Float, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType("LonLat")
export class Point {
  @Field(() => Float, { name: "longitude" })
  y: number;

  @Field(() => Float, { name: "latitude" })
  x: number;
}


export type Lazy<T extends object> = Promise<T> | T;
