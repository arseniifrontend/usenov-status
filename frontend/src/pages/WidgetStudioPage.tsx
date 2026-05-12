import { useMemo, useState } from "react";

import { StatusWidget } from "@usenov/status-widget";
import "@usenov/status-widget/dist/status-widget.css";

import CopyIcon from "../assets/copy-icon.svg";

type Theme = "dark" | "light" | "glass" | "neon";
type Appearance = "default" | "modern";
type ServiceType = "website" | "api";

type CustomSelectProps<T extends string> = {
  label: string;
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
};

function CustomSelect<T extends string>({
  label,
  value,
  options,
  onChange,
}: CustomSelectProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <label className="relative grid gap-2">
      <span className="text-sm text-zinc-400">{label}</span>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex h-[46px] items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 text-left text-sm text-white outline-none transition hover:border-white/20 focus:border-emerald-500/40"
      >
        <span>{value}</span>

        <svg
          className={`h-4 w-4 text-zinc-500 transition duration-200 ${
            open ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[82px] z-30 overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b0b]/95 p-2 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <div className="grid gap-1">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={[
                  "flex h-[42px] w-full items-center justify-between rounded-xl px-4 text-left text-sm transition",
                  option === value
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                <span>{option}</span>

                {option === value && (
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </label>
  );
}

export function WidgetStudioPage() {
  const [title, setTitle] = useState("Usenov Status");
  const [appearance, setAppearance] = useState<Appearance>("modern");
  const [theme, setTheme] = useState<Theme>("glass");
  const [accentColor, setAccentColor] = useState("#04AE79");
  const [maxWidth, setMaxWidth] = useState("1024px");

  const [showStatusCode, setShowStatusCode] = useState(true);
  const [showResponseTime, setShowResponseTime] = useState(true);
  const [showSummary, setShowSummary] = useState(true);
  const [showUrls, setShowUrls] = useState(true);
  const [showLastUpdated, setShowLastUpdated] = useState(true);
  const [showGlow, setShowGlow] = useState(true);
  const [showServiceType, setShowServiceType] = useState(true);
  const [showEyebrow, setShowEyebrow] = useState(true);
  const [showRootStatus, setShowRootStatus] = useState(true);
  const [showTitle, setShowTitle] = useState(true);

  const [serviceName, setServiceName] = useState("Usenov");
  const [serviceUrl, setServiceUrl] = useState("https://usenov.com");
  const [serviceType, setServiceType] = useState<ServiceType>("website");

  const [copied, setCopied] = useState(false);

  const generatedCode = useMemo(() => {
    return [
      `<StatusWidget`,
      `  appearance="${appearance}"`,
      appearance === "default" ? `  theme="${theme}"` : null,
      `  accentColor="${accentColor}"`,
      `  title="${title}"`,
      `  fullWidth`,
      `  maxWidth="${maxWidth}"`,
      `  showTitle={${showTitle}}`,
      `  showStatusCode={${showStatusCode}}`,
      `  showResponseTime={${showResponseTime}}`,
      `  showSummary={${showSummary}}`,
      `  showUrls={${showUrls}}`,
      `  showLastUpdated={${showLastUpdated}}`,
      `  showGlow={${showGlow}}`,
      `  showServiceType={${showServiceType}}`,
      `  showEyebrow={${showEyebrow}}`,
      `  showRootStatus={${showRootStatus}}`,
      `  services={[`,
      `    {`,
      `      name: "${serviceName}",`,
      `      url: "${serviceUrl}",`,
      `      type: "${serviceType}",`,
      `    },`,
      `  ]}`,
      `/>`,
    ]
      .filter(Boolean)
      .join("\n");
  }, [
    appearance,
    theme,
    accentColor,
    title,
    maxWidth,
    showStatusCode,
    showResponseTime,
    showSummary,
    showUrls,
    showLastUpdated,
    showGlow,
    serviceName,
    serviceUrl,
    serviceType,
    showServiceType,
    showEyebrow,
    showRootStatus,
    showTitle,
  ]);

  async function copyCode() {
    await navigator.clipboard.writeText(generatedCode);

    setCopied(true);

    window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <header className="mb-10">
          <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-400">
            Widget Studio
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build your status card
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-zinc-500 sm:text-base">
            Customize a beautiful infrastructure status widget and copy the
            generated React code.
          </p>
        </header>

        <section className="grid items-start gap-6 lg:grid-cols-[380px_1fr]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-7">
              <h2 className="text-xl font-semibold tracking-tight">
                Customize
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Change appearance, colors, labels and visible fields.
              </p>
            </div>

            <div className="grid gap-6">
              <label className="grid gap-2">
                <span className="text-sm text-zinc-400">Title</span>

                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="h-[46px] rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition placeholder:text-zinc-700 hover:border-white/20 focus:border-emerald-500/40"
                />
              </label>

              <div
                className={[
                  "grid gap-3",
                  appearance === "modern" ? "grid-cols-1" : "grid-cols-2",
                ].join(" ")}
              >
                <CustomSelect<Appearance>
                  label="Appearance"
                  value={appearance}
                  options={["default", "modern"]}
                  onChange={setAppearance}
                />

                {appearance === "default" && (
                  <CustomSelect<Theme>
                    label="Theme"
                    value={theme}
                    options={["glass", "dark", "light", "neon"]}
                    onChange={setTheme}
                  />
                )}
              </div>

              <div className="grid grid-cols-[1fr_58px] gap-3">
                <label className="grid gap-2">
                  <span className="text-sm text-zinc-400">Accent color</span>

                  <input
                    value={accentColor}
                    onChange={(event) => setAccentColor(event.target.value)}
                    className="h-[46px] rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition hover:border-white/20 focus:border-emerald-500/40"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm text-zinc-400">Pick</span>

                  <input
                    type="color"
                    value={accentColor}
                    onChange={(event) => setAccentColor(event.target.value)}
                    className="
                      h-[46px]
                      w-full
                      cursor-pointer
                      rounded-2xl
                      border
                      border-white/10
                      bg-black/20
                      p-1
                      appearance-none
                      overflow-hidden
                    "
                  />
                </label>
              </div>

              <label className="grid gap-2">
                <span className="text-sm text-zinc-400">Max width</span>

                <input
                  value={maxWidth}
                  onChange={(event) => setMaxWidth(event.target.value)}
                  className="h-[46px] rounded-2xl border border-white/10 bg-black/20 px-4 text-sm text-white outline-none transition hover:border-white/20 focus:border-emerald-500/40"
                />
              </label>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="mb-4 text-sm font-medium text-zinc-300">
                  Service
                </p>

                <div className="grid gap-3">
                  <input
                    value={serviceName}
                    onChange={(event) => setServiceName(event.target.value)}
                    placeholder="Service name"
                    className="h-[46px] rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition hover:border-white/20 focus:border-emerald-500/40"
                  />

                  <input
                    value={serviceUrl}
                    onChange={(event) => setServiceUrl(event.target.value)}
                    placeholder="Service URL"
                    className="h-[46px] rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition hover:border-white/20 focus:border-emerald-500/40"
                  />

                  <CustomSelect<ServiceType>
                    label="Type"
                    value={serviceType}
                    options={["website", "api"]}
                    onChange={setServiceType}
                  />
                </div>
              </div>

              <div className="grid gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                {[
                  ["Title", showTitle, setShowTitle],
                  ["Status code", showStatusCode, setShowStatusCode],
                  ["Response time", showResponseTime, setShowResponseTime],
                  ["Service type", showServiceType, setShowServiceType],
                  ["Live monitoring label", showEyebrow, setShowEyebrow],
                  ["Root status text", showRootStatus, setShowRootStatus],
                  ["Summary cards", showSummary, setShowSummary],
                  ["Service URLs", showUrls, setShowUrls],
                  ["Last updated", showLastUpdated, setShowLastUpdated],
                  ["Glow", showGlow, setShowGlow],
                ].map(([label, value, setter]) => (
                  <label
                    key={label as string}
                    className="flex items-center justify-between gap-4 text-sm text-zinc-300"
                  >
                    <span>{label as string}</span>

                    <input
                      type="checkbox"
                      checked={value as boolean}
                      onChange={(event) =>
                        (setter as (value: boolean) => void)(
                          event.target.checked,
                        )
                      }
                      className="h-4 w-4 accent-emerald-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <section className="grid gap-6">
            <div className="rounded-3xl border border-white/10 p-6 sm:p-8">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Live preview
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    This is how your widget will look.
                  </p>
                </div>

                <div className="w-fit rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-400">
                  React widget
                </div>
              </div>

              <div className="rounded-[32px] border border-white/10 p-6 sm:p-8 lg:p-10">
                <StatusWidget
                  appearance={appearance}
                  theme={theme}
                  accentColor={accentColor}
                  title={title}
                  fullWidth
                  maxWidth={maxWidth}
                  showStatusCode={showStatusCode}
                  showResponseTime={showResponseTime}
                  showSummary={showSummary}
                  showUrls={showUrls}
                  showLastUpdated={showLastUpdated}
                  showEyebrow={showEyebrow}
                  showRootStatus={showRootStatus}
                  showGlow={showGlow}
                  {...({ showTitle } as { showTitle: boolean })}
                  {...({ showServiceType } as { showServiceType: boolean })}
                  services={[
                    {
                      name: serviceName,
                      url: serviceUrl,
                      type: serviceType,
                    },
                  ]}
                />
              </div>
            </div>
            
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    Generated code
                  </h2>

                  <p className="mt-2 text-sm text-zinc-500">
                    Copy and paste into your React project.
                  </p>
                </div>

                <button
                  onClick={copyCode}
                  className={[
                    "flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                    copied
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                      : "border-white/10 bg-white/5 text-zinc-300 hover:border-white/20 hover:bg-white/10",
                  ].join(" ")}
                >
                  {copied ? (
                    <>
                      <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>

                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={CopyIcon}
                        alt="Copy"
                        className="h-4 w-4 brightness-0 invert opacity-80"
                      />

                      <span>Copy code</span>
                    </>
                  )}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 p-2">
                <pre className="custom-scrollbar max-h-[420px] overflow-auto rounded-xl bg-black/40 p-4 text-sm leading-7 text-zinc-300">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}

export default WidgetStudioPage;
