import { IsEmail, IsString , IsLowercase } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsLowercase()
  public serviceYn: string;

  @IsLowercase()
  public emailYn: string;
}

export class FindUserIdDto {
  @IsString()
  public id: string;
}

export class FindUserEmailDto {
  @IsString()
  public email: string;
}

export class FindUserNameDto {
  @IsString()
  public nickName: string;
}

export class test {
  ntest : string;
}


