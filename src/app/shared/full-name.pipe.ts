import { Pipe, PipeTransform } from '@angular/core';

export interface UserPipe {
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {
  transform(
    value: UserPipe,
    mode?: 'uppercase' | 'lowercase',
    ...args: unknown[]
  ): unknown {

    const result = value.lastName + ' ' + value.firstName;

    if (mode === 'uppercase') {
      return result.toUpperCase();
    }

    return result;
  }
}
