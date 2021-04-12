import { setup } from 'twind'
import typography from '@twind/typography'
import {
  formCheckbox,
  formField,
  formFile,
  formInput,
  formRadio,
  formSelect,
  formTextarea,
} from '@twind/forms'

export const setupTwind = () =>
  setup({
    plugins: {
      ...typography(),
      'form-checkbox': formCheckbox,
      'form-field': formField,
      'form-file': formFile,
      'form-input': formInput,
      'form-radio': formRadio,
      'form-select': formSelect,
      'form-textarea': formTextarea,
    },
  })
