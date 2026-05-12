import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import "./styles.css";

export type StatusWidgetStatus = "online" | "degraded" | "down";
export type StatusWidgetTheme = "dark" | "light" | "glass" | "neon";
export type StatusWidgetRounded = "md" | "xl" | "2xl";
export type StatusWidgetAppearance = "default" | "modern";

export type StatusWidgetColors = {
  background?: string;
  cardBackground?: string;
  text?: string;
  mutedText?: string;
  border?: string;
  online?: string;
  degraded?: string;
  down?: string;
};

export type StatusWidgetInputService = {
  name: string;
  url: string;
  type?: "website" | "api";
};

export type StatusWidgetService = StatusWidgetInputService & {
  id: string;
  status: StatusWidgetStatus;
  statusCode: number | null;
  responseTime: number | null;
  checkedAt: string;
  error?: string;
};

export type StatusWidgetProps = {
  title?: string;
  services: StatusWidgetInputService[];
  apiUrl?: string;

  theme?: StatusWidgetTheme;
  appearance?: StatusWidgetAppearance;
  accentColor?: string;
  rounded?: StatusWidgetRounded;
  colors?: StatusWidgetColors;

  refreshInterval?: number;

  showUrls?: boolean;
  showResponseTime?: boolean;
  showStatusCode?: boolean;
  showLastUpdated?: boolean;
  showHeader?: boolean;
  showTitle?: boolean;

  enableHover?: boolean;

  onlineLabel?: string;
  degradedLabel?: string;
  downLabel?: string;

  className?: string;

  width?: string;
  maxWidth?: string;
  fullWidth?: boolean;

  showGlow?: boolean;

  showEyebrow?: boolean;
  showPulse?: boolean;
  showRootStatus?: boolean;

  showServiceType?: boolean;

  eyebrowText?: string;
  rootStatusText?: string;

  showSummary?: boolean;
  summaryLabels?: {
    total?: string;
    online?: string;
    degraded?: string;
    avgLatency?: string;
  };
};

type StatusResponse = {
  success: boolean;
  checkedAt: string;
  services: StatusWidgetService[];
};

const DEFAULT_API_URL = "https://worker.usenov.workers.dev";

function getStatusLabel(
  status: StatusWidgetStatus,
  labels: {
    onlineLabel: string;
    degradedLabel: string;
    downLabel: string;
  }
) {
  if (status === "online") return labels.onlineLabel;
  if (status === "degraded") return labels.degradedLabel;
  return labels.downLabel;
}

function getRootStatus(services: StatusWidgetService[]) {
  if (services.length === 0) return "Checking services...";
  if (services.some((service) => service.status === "down")) return "Some services require attention";
  if (services.some((service) => service.status === "degraded")) return "Some services degraded";
  return "All systems operational";
}

async function checkServices(
  apiUrl: string,
  services: StatusWidgetInputService[]
): Promise<StatusResponse> {
  const response = await fetch(`${apiUrl}/api/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ services }),
  });

  if (!response.ok) {
    throw new Error("Failed to check services");
  }

  return response.json();
}

export function StatusWidget({
  title = "System Status",
  services,

  apiUrl = DEFAULT_API_URL,

  theme = "glass",
  appearance = "default",
  accentColor = "#22c55e",
  rounded = "2xl",
  colors,

  refreshInterval = 30000,

  showUrls = true,
  showResponseTime = true,
  showStatusCode = false,
  showLastUpdated = true,
  showHeader = true,
  showTitle = true,

  enableHover = true,

  onlineLabel = "Operational",
  degradedLabel = "Degraded",
  downLabel = "Down",

  className = "",

  width,
  maxWidth = "620px",
  fullWidth = false,

  showGlow = true,

  showEyebrow = true,
  showPulse = true,
  showRootStatus = true,

  showServiceType = true,

  eyebrowText,
  rootStatusText,

  showSummary = true,
  summaryLabels,
}: StatusWidgetProps) {
  const [checkedServices, setCheckedServices] = useState<StatusWidgetService[]>([]);
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadStatus(isRefresh = false) {
    try {
      if (isRefresh) setRefreshing(true);

      const data = await checkServices(apiUrl, services);

      setCheckedServices(data.services);
      setCheckedAt(data.checkedAt);
      setError(null);
    } catch {
      setError("Failed to load service status");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadStatus();

    if (!refreshInterval) return;

    const intervalId = window.setInterval(() => {
      loadStatus(true);
    }, refreshInterval);

    return () => window.clearInterval(intervalId);
  }, [apiUrl, refreshInterval, JSON.stringify(services)]);

  const rootStatus = useMemo(() => {
    return getRootStatus(checkedServices);
  }, [checkedServices]);

  const summary = useMemo(() => {
    const targetServices = loading ? [] : checkedServices;

    const total = loading ? services.length : targetServices.length;
    const online = targetServices.filter((s) => s.status === "online").length;
    const degraded = targetServices.filter((s) => s.status === "degraded").length;

    const avgLatency =
      targetServices.length > 0
        ? Math.round(
            targetServices.reduce((sum, s) => sum + (s.responseTime ?? 0), 0) /
              targetServices.length
          )
        : 0;

    return {
      total,
      online,
      degraded,
      avgLatency,
    };
  }, [checkedServices, loading, services.length]);

  const widgetStyle = {
    "--usenov-status-accent": accentColor,

    "--usenov-status-bg": colors?.background,
    "--usenov-status-card-bg": colors?.cardBackground,
    "--usenov-status-text": colors?.text,
    "--usenov-status-muted": colors?.mutedText,
    "--usenov-status-border": colors?.border,

    "--usenov-status-online": colors?.online,
    "--usenov-status-degraded": colors?.degraded,
    "--usenov-status-down": colors?.down,

    "--usenov-status-width": fullWidth ? "100%" : width,
    "--usenov-status-max-width": fullWidth ? "100%" : maxWidth,

    "--usenov-status-glow-opacity": showGlow ? "0.16" : "0",
  } as CSSProperties;

  const labels = {
    onlineLabel,
    degradedLabel,
    downLabel,
  };

  const isModern = appearance === "modern";

  return (
    <section
      className={[
        "usenov-status-widget",
        `usenov-status-widget--${theme}`,
        `usenov-status-widget--${rounded}`,
        `usenov-status-widget--appearance-${appearance}`,
        className,
      ].join(" ")}
      style={widgetStyle}
    >
      {showHeader && (
        <header className="usenov-status-widget__header">
          <div>
            {showEyebrow && (
              <p className="usenov-status-widget__eyebrow">
                {refreshing
                  ? isModern
                    ? "Checking services..."
                    : "Refreshing"
                  : eyebrowText ?? (isModern ? "Live monitoring" : "Live status")}
              </p>
            )}

            {showTitle && (
              <h3 className="usenov-status-widget__title">{title}</h3>
            )}

            {showRootStatus && (
              <p className="usenov-status-widget__subtitle">
                {loading ? "Checking services..." : rootStatusText ?? rootStatus}
              </p>
            )}

            {showLastUpdated && checkedAt && isModern && (
              <p className="usenov-status-widget__updated usenov-status-widget__updated--header">
                Last updated: {new Date(checkedAt).toLocaleTimeString()}
              </p>
            )}
          </div>

          {showPulse && !isModern && <span className="usenov-status-widget__pulse" />}
        </header>
      )}

      {error && <div className="usenov-status-widget__error">{error}</div>}

      {isModern && showSummary && (
        <div className="usenov-status-widget__summary">
          <div className="usenov-status-widget__summary-card">
            <p>{summaryLabels?.total ?? "Services"}</p>
            <strong>{summary.total}</strong>
          </div>

          <div className="usenov-status-widget__summary-card">
            <p>{summaryLabels?.online ?? "Operational"}</p>
            <strong className="usenov-status-widget__summary-value--online">
              {summary.online}
            </strong>
          </div>

          <div className="usenov-status-widget__summary-card">
            <p>{summaryLabels?.degraded ?? "Degraded"}</p>
            <strong className="usenov-status-widget__summary-value--degraded">
              {summary.degraded}
            </strong>
          </div>

          <div className="usenov-status-widget__summary-card">
            <p>{summaryLabels?.avgLatency ?? "Avg latency"}</p>
            <strong>{summary.avgLatency} ms</strong>
          </div>
        </div>
      )}

      <div className="usenov-status-widget__list">
        {loading &&
          services.map((service) => (
            <article
              key={service.url}
              className={[
                "usenov-status-widget__service",
                "usenov-status-widget__service--loading",
                enableHover ? "usenov-status-widget__service--hover" : "",
              ].join(" ")}
            >
              <div className="usenov-status-widget__service-info">
                <strong>{service.name}</strong>
                {showUrls && <span>{service.url}</span>}
              </div>

              <div className="usenov-status-widget__skeleton" />
            </article>
          ))}

        {!loading &&
          checkedServices.map((service) => (
            <article
              key={`${service.name}-${service.url}`}
              className={[
                "usenov-status-widget__service",
                enableHover ? "usenov-status-widget__service--hover" : "",
              ].join(" ")}
            >
              <div className="usenov-status-widget__service-top">
                <div className="usenov-status-widget__service-info">
                  <strong>{service.name}</strong>
                  {showUrls && <span>{service.url}</span>}
                </div>

                <span
                  className={[
                    "usenov-status-widget__badge",
                    `usenov-status-widget__badge--${service.status}`,
                  ].join(" ")}
                >
                  {getStatusLabel(service.status, labels)}
                </span>
              </div>

              <div className="usenov-status-widget__service-stats">
                {showStatusCode && (
                  <div className="usenov-status-widget__stat">
                    <span>Status code</span>
                    <strong>{service.statusCode ?? "--"}</strong>
                  </div>
                )}

                {showResponseTime && (
                  <div className="usenov-status-widget__stat">
                    <span>Response time</span>
                    <strong>{service.responseTime ?? "--"} ms</strong>
                  </div>
                )}

                {showServiceType && (
                  <div className="usenov-status-widget__stat">
                    <span>Type</span>
                    <strong>{service.type ?? "website"}</strong>
                  </div>
                )}
              </div>
            </article>
          ))}
      </div>

      {showLastUpdated && checkedAt && !isModern && (
        <p className="usenov-status-widget__updated">
          Last updated: {new Date(checkedAt).toLocaleTimeString()}
        </p>
      )}
    </section>
  );
}