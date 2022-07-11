import { IForm } from "../../types";

export const getFormData = (form: IForm) => {
  const data: any = {};
  let valid = true;
  Object.entries(form).forEach(([field, control]) => {
    if (!control.validate()) {
      valid = false;
    }
    data[field] = control.getValue();
  });

  return valid && data;
};
