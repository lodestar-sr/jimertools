export interface IFormControl {
  name: string;
  validate(): boolean;
  getValue(): any;
  reset(): void;
}

export interface IForm {
  [field: string]: IFormControl;
}
