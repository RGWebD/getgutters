import { useEffect, useMemo, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { MessageCircle, X, Send, Droplets, CheckCircle2 } from "lucide-react";

function newId() {
  return crypto.randomUUID();
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [conversationId] = useState(() =>
    typeof window === "undefined" ? "" : newId(),
  );
  const transport = useMemo(
    () => new DefaultChatTransport({ api: "/api/chat", body: { conversationId } }),
    [conversationId],
  );
  const { messages, sendMessage, status, error } = useChat({ id: conversationId, transport });
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);
  useEffect(() => {
    if (open && !busy) inputRef.current?.focus();
  }, [open, busy]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    sendMessage({ text: t });
    setInput("");
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Chat with Get Gutters"
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-3.5 font-semibold text-primary-foreground shadow-gold transition hover:brightness-110"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Questions? Chat with us</span>
        </button>
      )}

      {open && (
        <div className="fixed inset-x-2 bottom-2 z-[60] flex h-[min(620px,calc(100dvh-1rem))] flex-col overflow-hidden rounded-2xl border border-primary/40 bg-card shadow-luxe sm:inset-x-auto sm:right-5 sm:bottom-5 sm:w-[380px]">
          <div className="flex items-center justify-between border-b border-border bg-background/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground">
                <Droplets className="h-5 w-5" />
              </div>
              <div className="leading-tight">
                <p className="font-display font-semibold">Get Gutters Assistant</p>
                <p className="text-xs text-muted-foreground">Ask anything · Free estimates</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 text-muted-foreground hover:text-primary"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            <div className="max-w-[90%] text-foreground">
              Hi! I'm the Get Gutters assistant. Ask me about seamless gutters, guards, cleaning,
              repairs — or I can set you up with a <strong>free estimate</strong> from Pablo.
            </div>
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2">
                {["I need new gutters", "Do you serve my area?", "Get a free estimate"].map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    className="rounded-full border border-primary/40 px-3 py-1.5 text-xs text-primary hover:bg-primary/10"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={m.role === "user" ? "flex justify-end" : ""}>
                {m.parts.map((p, i) => {
                  if (p.type === "text") {
                    return m.role === "user" ? (
                      <div
                        key={i}
                        className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-primary-foreground"
                      >
                        {p.text}
                      </div>
                    ) : (
                      <div key={i} className="max-w-[95%] text-foreground [&_a]:text-primary [&_a]:underline [&_ul]:list-disc [&_ul]:pl-5 [&_p]:my-1">
                        <ReactMarkdown>{p.text}</ReactMarkdown>
                      </div>
                    );
                  }
                  if (p.type === "tool-save_lead" && p.state === "output-available") {
                    const ok = (p.output as { ok?: boolean })?.ok;
                    return ok ? (
                      <div key={i} className="my-1 flex items-center gap-2 rounded-lg border border-primary/40 px-3 py-2 text-xs text-primary">
                        <CheckCircle2 className="h-4 w-4" /> Request sent to Pablo
                      </div>
                    ) : null;
                  }
                  return null;
                })}
              </div>
            ))}
            {status === "submitted" && (
              <div className="flex gap-1 py-1">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-2 w-2 animate-bounce rounded-full bg-primary"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
            {error && (
              <p className="text-xs text-destructive">
                Sorry, something went wrong. Please call or text (904) 589-0000.
              </p>
            )}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="border-t border-border p-3"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                maxLength={1000}
                placeholder="Type your message…"
                className="max-h-28 flex-1 resize-none rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-primary-foreground disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-[10px] leading-snug text-muted-foreground">
              Messages are saved to help with estimates. Do not share sensitive information.
            </p>
          </form>
        </div>
      )}
    </>
  );
}
