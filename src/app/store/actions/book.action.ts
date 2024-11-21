import { createAction, props } from '@ngrx/store';
import { Book } from '../../../../libs/generated-api/src';

export const submitForm = createAction(
  '[Form] Submit Form',
  props<{ formData: Book }>()
);

export const submitFormSuccess = createAction(
  '[Form] Submit Form Success'
);

export const submitFormFailure = createAction(
  '[Form] Submit Form Failure',
  props<{ error: any }>()
);
