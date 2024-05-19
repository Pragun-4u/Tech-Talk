// components/ErrorBoundary.tsx
"use client";
import Image from "next/image";
import React, { Component, ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryJSX />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

const ErrorBoundaryJSX = () => {
  return (
    <img
      src="/assets/images/something-went-wrong.gif"
      style={{ height: "100vh", width: "100vw", objectFit: "contain" }}
    />
  );
};
