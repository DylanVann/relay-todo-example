import { tw } from 'twind'
import { ForwardedRef, forwardRef } from 'react'

type ButtonProps = JSX.IntrinsicElements['button']

export default forwardRef(function Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      className={tw`p-1 border bg-black text-white flex items-center justify-center cursor-pointer`}
      ref={ref}
    />
  )
})
