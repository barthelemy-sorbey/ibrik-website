"use client";

import "./globals.css";

// Last-resort boundary: it replaces the root layout, so no fonts, no
// translations and no nav are available here. Keep it self-contained.
export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <title>500 — IBRIK KITCHEN</title>
        <section className="section s-oops s-oops--bare">
          <div className="wrap">
            <div className="oops-row">
              <div className="oops-code-col">
                <div className="oops-code display" aria-hidden="true">
                  <span className="oops-digit">5</span>
                  <span className="oops-digit is-zero">0</span>
                  <span className="oops-digit is-zero">0</span>
                </div>
              </div>
              <div className="oops-text-col">
                <p className="oops-eyebrow">Error 500 · ceva a ars</p>
                <h1 className="display">
                  <span>Something </span>
                  <span className="accent">burned.</span>
                </h1>
                <p className="oops-lead">
                  The kitchen dropped a pan. Give it a moment and try again — if
                  it keeps smoking, call us and we&rsquo;ll take your table by
                  phone.
                </p>
                <div className="oops-actions">
                  <button
                    type="button"
                    className="oops-cta"
                    onClick={() => unstable_retry()}
                  >
                    Try again
                  </button>
                  {/* Full reload on purpose: the root layout is broken here,
                      so client-side navigation has nothing to render into. */}
                  {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
                  <a href="/" className="oops-link">
                    Back to the table
                  </a>
                  <a href="tel:+33170694250" className="oops-link">
                    +33 1 70 69 42 50
                  </a>
                </div>
                {error.digest ? (
                  <p className="oops-note">
                    Reference for the kitchen:{" "}
                    <span className="oops-digest">{error.digest}</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
          <div className="pattern-strip" />
        </section>
      </body>
    </html>
  );
}
