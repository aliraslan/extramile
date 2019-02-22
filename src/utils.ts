import { Field, Float, InputType, ObjectType } from "type-graphql";

@ObjectType()
@InputType("LonLat")
export class Point {
  @Field(() => Float)
  longitude: number;

  @Field(() => Float)
  latitude: number;
}


export type Lazy<T extends object> = Promise<T> | T;
