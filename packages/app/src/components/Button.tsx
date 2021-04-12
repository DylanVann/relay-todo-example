import { tw } from 'twind'
import { ForwardedRef, forwardRef } from 'react'

type ButtonProps = JSX.IntrinsicElements['button']

export default forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const { children, ...otherProps } = props
  return (
    <button
      {...otherProps}
      className={tw(
        `p-2 bg-black text-white flex items-center justify-center cursor-pointer`,
        `disabled:bg-gray-300`,
      )}
      ref={ref}
    >
      <span className={tw`cap-main`}>{children}</span>
    </button>
  )
})
