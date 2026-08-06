import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallbackName?: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`ErrorBoundary caught error in [${this.props.fallbackName || 'Component'}]:`, error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          margin: '20px auto',
          maxWidth: '800px',
          background: 'rgba(239, 68, 68, 0.05)',
          border: '1px solid rgba(239, 68, 68, 0.2)',
          borderRadius: '16px',
          color: '#ef4444',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', fontWeight: 700 }}>
            Unable to display section ({this.props.fallbackName || 'Content'})
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>
            A temporary error occurred while rendering this section. The rest of the site remains operational.
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
