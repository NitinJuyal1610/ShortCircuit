import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;

  @Prop({ required: true, type: String, unique: true })
  short_code: string;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ required: true, type: Number })
  user_id: number;
}

export const LinkSchema = SchemaFactory.createForClass(Link);