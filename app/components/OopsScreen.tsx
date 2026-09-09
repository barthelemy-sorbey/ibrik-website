import type { ReactNode } from "react";
import { Steam, SpinSeal } from "./Decor";

type Props = {
  code: string;
  eyebrow: string;
  seal: string;
  titlePre: string;
  titleAccent: string;
  lead: string;
  actions: ReactNode;
  note?: ReactNode;
};

export default function OopsScreen({
  code,
  eyebrow,
  seal,
  titlePre,
  titleAccent,
  lead,
  actions,
  note,
}: Props) {
  return (
    <section className="section s-oops">
      <Steam />
      <div className="wrap">
        <div className="oops-row">
          <div className="oops-code-col">
            <div className="oops-code display" aria-hidden="true">
              {code.split("").map((digit, i) => (
                <span
                  className={`oops-digit${digit === "0" ? " is-zero" : ""}`}
                  key={i}
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  {digit}
                </span>
              ))}
            </div>
            <SpinSeal text={seal} color="var(--green)" size={116} />
          </div>

          <div className="oops-text-col">
            <p className="oops-eyebrow">{eyebrow}</p>
            <h1 className="display">
              <span>{titlePre}</span>
              <span className="accent">{titleAccent}</span>
            </h1>
            <p className="oops-lead">{lead}</p>
            <div className="oops-actions">{actions}</div>
            {note ? <p className="oops-note">{note}</p> : null}
          </div>
        </div>
      </div>
      <div className="pattern-strip" />
    </section>
  );
}
