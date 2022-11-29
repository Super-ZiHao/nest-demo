import { IsNotEmpty, IsString } from 'class-validator';

enum MessageText {
  IsNotEmpty = '必填项',
  IsString = '字符串',
}

export class CreateCatDto {
  @IsString({
    message: MessageText.IsString,
  })
  @IsNotEmpty({
    message: MessageText.IsNotEmpty,
  })
  readonly name: string;
  @IsString({
    message: MessageText.IsString,
  })
  @IsNotEmpty({
    message: MessageText.IsNotEmpty,
  })
  readonly password: string;
  @IsString({
    message: MessageText.IsString,
  })
  @IsNotEmpty({
    message: MessageText.IsNotEmpty,
  })
  readonly code: string;
}
