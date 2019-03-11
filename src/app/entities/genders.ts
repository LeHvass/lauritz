export interface Gender {
  value: string;
  viewValue: string;
}

export class SelectGender {
  foods: Gender[] = [
    {value: 'male', viewValue: 'Male'},
    {value: 'female', viewValue: 'Female'},
    {value: 'other', viewValue: 'Other'}
  ];
}