import {
  FocusEventHandler,
  ForwardedRef,
  forwardRef,
  KeyboardEventHandler,
  useRef,
} from 'react'
import Input from './Input'
import { tw } from 'twind'
import classNames from 'classnames'

export type InputInlineProps = JSX.IntrinsicElements['input'] & {
  onSave?: (value: string) => void
}

export default forwardRef(function InputInline(
  props: InputInlineProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const { onSave, ...inputProps } = props
  const inputRef = useRef<HTMLInputElement | null>(null)
  const saveRef = (el: HTMLInputElement | null) => {
    inputRef.current = el
    if (ref && typeof ref === 'function') {
      ref(el)
    }
    if (ref && typeof ref === 'object') {
      ;(ref as any).current = el
    }
  }
  const save = () => {
    const value = inputRef.current?.value || ''
    if (value !== props.defaultValue) {
      props.onSave?.(value)
    }
  }
  const onBlur: FocusEventHandler = (e) => {
    save()
  }
  const onKeyDown: KeyboardEventHandler = (e) => {
    if (inputRef.current) {
      if (e.key === 'Escape') {
        inputRef.current.value = (props.defaultValue as string) || ''
        inputRef.current.blur()
      } else if (e.key === 'Enter') {
        save()
        inputRef.current.blur()
      }
    }
  }
  return (
    <Input
      {...inputProps}
      variant={'ghost'}
      ref={saveRef}
      defaultValue={props.defaultValue}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onKeyPress={() => console.log('keypress')}
    />
  )
})
