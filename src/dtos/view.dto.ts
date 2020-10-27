import { IsNumberString } from 'class-validator';

export class GetView {
  @IsNumberString()
  public id: number;
}
