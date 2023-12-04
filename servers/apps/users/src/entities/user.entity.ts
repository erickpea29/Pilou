/* eslint-disable prettier/prettier */
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field({ nullable: true })
  phone_number: number;

  @Field({ nullable: true })
  emergency_contact: string;

  @Field({ nullable: true })
  emergency_number: number;

  @Field({ nullable: true })
  blood_type: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
