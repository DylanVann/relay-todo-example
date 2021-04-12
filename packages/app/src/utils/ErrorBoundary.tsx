import { Component, ReactNode } from 'react'

/**
 * A reusable component for handling errors in a React (sub)tree.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: any }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error: any) {
    return {
      error,
    }
  }

  render() {
    if (this.state.error != null) {
      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.source, null, 2)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
