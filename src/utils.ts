import { Field, Float, ObjectType, registerEnumType } from "type-graphql";

@ObjectType()
export class Point {
  @Field(() => Float, { name: "longitude" })
  y: number;

  @Field(() => Float, { name: "latitude" })
  x: number;
}

export enum TripStatus {
  Planned = "planned", // sue me. it was either unstarted or unbegun
  Started = "started",
  Completed = "completed",
  Cancelled = "cancelled",
}

registerEnumType(TripStatus, { name: "tripStatus" });

export type Lazy<T extends object> = Promise<T> | T;
