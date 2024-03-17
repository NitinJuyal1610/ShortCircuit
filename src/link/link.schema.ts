import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LinkDocument = HydratedDocument<Link>;

@Schema()
export class Link {
  @Prop({ required: true, default: () => new Date() })
  created_at: Date;

  @Prop({ required: true, type: String, unique: true, index: true })
  short_code: string;

  @Prop({ required: true, type: String })
  url: string;

  @Prop({ required: true, type: String, index: true })
  user_id: string;
}

export const LinkSchema = SchemaFactory.createForClass(Link);
