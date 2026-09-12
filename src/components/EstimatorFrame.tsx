import { useState } from "react";

const PASSCODE = "gutters2025";

type EstimatorFrameProps = {
  view: "estimate" | "database";
};

export function EstimatorFrame({ view }: EstimatorFrameProps) {
  const [unlocked, setUnlocked] = useState(
    () =>
      typeof window !== "undefined" &&
      window.sessionStorage.getItem("gg-estimator") === "1"
  );
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center px-4">
        <form
          className="w-full max-w-sm text-center space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (code === PASSCODE) {
              window.sessionStorage.setItem("gg-estimator", "1");
              setUnlocked(true);
            } else {
              setError(true);
            }
          }}
        >
          <p className="font-display text-2xl text-[#e4c36a] tracking-wide">
            Get Gutters Estimator
          </p>
          <p className="text-sm text-[#9aa6b8]">
            Private tool — enter access code
          </p>
          <input
            type="password"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError(false);
            }}
            placeholder="Access code"
            className="w-full rounded-full bg-[#111827] border border-[#c9a227]/40 px-5 py-3 text-[#e8edf4] text-center focus:outline-none focus:border-[#c9a227]"
            autoFocus
          />
          {error && <p className="text-sm text-red-400">Incorrect code</p>}
          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-b from-[#e4c36a] to-[#c9a227] text-[#1a1406] font-bold py-3"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <iframe
      src={`/estimator-app.html?view=${view}`}
      title={view === "database" ? "Get Gutters Database" : "Get Gutters Estimator"}
      className="fixed inset-0 w-full h-full border-0 bg-[#0b1220]"
    />
  );
}
