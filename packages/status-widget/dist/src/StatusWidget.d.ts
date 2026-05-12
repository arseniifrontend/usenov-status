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
export declare function StatusWidget({ title, services, apiUrl, theme, appearance, accentColor, rounded, colors, refreshInterval, showUrls, showResponseTime, showStatusCode, showLastUpdated, showHeader, showTitle, enableHover, onlineLabel, degradedLabel, downLabel, className, width, maxWidth, fullWidth, showGlow, showEyebrow, showPulse, showRootStatus, showServiceType, eyebrowText, rootStatusText, showSummary, summaryLabels, }: StatusWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=StatusWidget.d.ts.map