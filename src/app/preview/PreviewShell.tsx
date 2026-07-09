import type { ReactNode } from "react";
import type { PreviewFrame } from "./preview-config";

type PreviewShellProps = {
  frame: PreviewFrame;
  children: ReactNode;
};

export function PreviewShell({ frame, children }: PreviewShellProps) {
  const scale = frame.scaleBaseWidth / frame.width;

  return (
    <main className="preview-stage">
      <header className="preview-toolbar">
        <div>
          <div className="preview-title">{frame.label}</div>
          <div className="preview-meta">
            {frame.width} x {frame.height}
          </div>
        </div>
        <a href="/" className="preview-link">
          Live dashboard
        </a>
      </header>
      <section className="preview-scroll">
        <div
          className="preview-frame"
          data-preview-target={frame.target}
          data-preview-width={frame.width}
          data-preview-height={frame.height}
          style={{
            width: frame.width,
            height: frame.height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            marginBottom: frame.height * (scale - 1),
          }}
        >
          {children}
        </div>
      </section>
    </main>
  );
}
