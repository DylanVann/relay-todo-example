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
      className={classNames(tw`form-input`, props.className)}
      ref={ref}
    />
  )
})
