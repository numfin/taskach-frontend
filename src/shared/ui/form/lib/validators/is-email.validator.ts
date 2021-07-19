import { Validator } from '../validator';

const emailRe =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export class IsEmail<T extends string> extends Validator<T> {
  name = 'IsEmail';
  validate(value: T) {
    if (value.length > 0 && !emailRe.test(value)) {
      return 'Invalid e-mail';
    }
    return null;
  }
}
