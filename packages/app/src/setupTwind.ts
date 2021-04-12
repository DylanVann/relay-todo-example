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
import { twindPluginCapsize } from 'twind-plugin-capsize'

export const setupTwind = () =>
  setup({
    theme: {
      fontFamily: {
        main: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'field-border': 'inset 0 0 0 1px rgba(0,0,0,0.2)',
        'field-border-focus':
          'inset 0 0 0 1px rgba(0,0,255,0.4), 0 0 0 2px rgba(0,0,255,0.2)',
      },
    },
    plugins: {
      ...typography(),
      'cap-main': twindPluginCapsize({
        capHeight: 1456,
        ascent: 1900,
        descent: -500,
        lineGap: 0,
        unitsPerEm: 2048,
      }),
      'form-checkbox': formCheckbox,
      'form-field': formField,
      'form-file': formFile,
      'form-input': formInput,
      'form-radio': formRadio,
      'form-select': formSelect,
      'form-textarea': formTextarea,
    },
  })
