import { ForwardedRef, forwardRef } from 'react'
import { tw } from 'twind'
import classNames from 'classnames'

type InputProps = JSX.IntrinsicElements['input']

export default forwardRef(function Input(
  props: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      {...props}
      className={classNames(
        tw(
          `form-input px-1.5 py-0`,
          `border-none! focus:outline-none! appearance-none focus:ring-0`,
          `shadow-field-border focus:shadow-field-border-focus`,
        ),
        props.className,
      )}
      ref={ref}
    />
  )
})
