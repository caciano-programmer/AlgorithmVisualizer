import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <h1 style={{ height: '100%', width: '100%', textAlign: 'center' }}>
          Something went wrong. Please try refreshing page.
        </h1>
      );
    }

    return children;
  }
}
