"use client";

import { Component, type ReactNode } from "react";

type State = { failed: boolean };

/** Keeps a failed study-hub panel from rendering as an empty box. */
export class StudyHubErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <p className="study-hub__error">This panel couldn’t be loaded. Refresh the page to try again.</p>;
    }
    return this.props.children;
  }
}
