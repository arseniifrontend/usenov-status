import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";

import "./styles.css";

export type StatusWidgetStatus = "online" | "degraded" | "down";

export type StatusWidgetTheme = "dark" | "light" | "glass" | "neon";

export type StatusWidgetRounded = "md" | "xl" | "2xl";

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
  accentColor?: string;
  rounded?: StatusWidgetRounded;
  colors?: StatusWidgetColors;

  refreshInterval?: number;

  showUrls?: boolean;
  showResponseTime?: boolean;
  showStatusCode?: boolean;
  showLastUpdated?: boolean;
  showHeader?: boolean;

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

  if (services.some((service) => service.status === "down")) {
    return "Major outage";
  }

  if (services.some((service) => service.status === "degraded")) {
    return "Some services degraded";
  }

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
    body: JSON.stringify({
      services,
    }),
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
  accentColor = "#22c55e",
  rounded = "2xl",
  colors,

  refreshInterval = 30000,

  showUrls = true,
  showResponseTime = true,
  showStatusCode = false,
  showLastUpdated = true,
  showHeader = true,

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

  return (
    <section
      className={[
        "usenov-status-widget",
        `usenov-status-widget--${theme}`,
        `usenov-status-widget--${rounded}`,
        className,
      ].join(" ")}
      style={widgetStyle}
    >
      {showHeader && (
        <header className="usenov-status-widget__header">
          <div>
            {showEyebrow && (
              <p className="usenov-status-widget__eyebrow">
                {refreshing ? "Refreshing" : "Live status"}
              </p>
            )}

            <h3 className="usenov-status-widget__title">{title}</h3>

            {showRootStatus && (
              <p className="usenov-status-widget__subtitle">
                {loading ? "Checking services..." : rootStatus}
              </p>
            )}
          </div>

          {showPulse && (
            <span className="usenov-status-widget__pulse" />
          )}
        </header>
      )}

      {error && <div className="usenov-status-widget__error">{error}</div>}

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
              <div className="usenov-status-widget__service-info">
                <strong>{service.name}</strong>

                {showUrls && <span>{service.url}</span>}
              </div>

              <div className="usenov-status-widget__service-meta">
                {showStatusCode && (
                  <span className="usenov-status-widget__code">
                    {service.statusCode ?? "--"}
                  </span>
                )}

                {showResponseTime && (
                  <span className="usenov-status-widget__latency">
                    {service.responseTime ?? "--"} ms
                  </span>
                )}

                <span
                  className={[
                    "usenov-status-widget__badge",
                    `usenov-status-widget__badge--${service.status}`,
                  ].join(" ")}
                >
                  {getStatusLabel(service.status, labels)}
                </span>
              </div>
            </article>
          ))}
      </div>

      {showLastUpdated && checkedAt && (
        <p className="usenov-status-widget__updated">
          Last updated: {new Date(checkedAt).toLocaleTimeString()}
        </p>
      )}
    </section>
  );
}