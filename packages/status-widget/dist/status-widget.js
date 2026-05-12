import { useEffect as e, useMemo as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/StatusWidget.tsx
var a = "https://worker.usenov.workers.dev";
function o(e, t) {
	return e === "online" ? t.onlineLabel : e === "degraded" ? t.degradedLabel : t.downLabel;
}
function s(e) {
	return e.length === 0 ? "Checking services..." : e.some((e) => e.status === "down") ? "Some services require attention" : e.some((e) => e.status === "degraded") ? "Some services degraded" : "All systems operational";
}
async function c(e, t) {
	let n = await fetch(`${e}/api/check`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ services: t })
	});
	if (!n.ok) throw Error("Failed to check services");
	return n.json();
}
function l({ title: l = "System Status", services: u, apiUrl: d = a, theme: f = "glass", appearance: p = "default", accentColor: ee = "#22c55e", rounded: m = "2xl", colors: h, refreshInterval: g = 3e4, showUrls: _ = !0, showResponseTime: v = !0, showStatusCode: y = !1, showLastUpdated: b = !0, showHeader: x = !0, showTitle: S = !0, enableHover: C = !0, onlineLabel: w = "Operational", degradedLabel: T = "Degraded", downLabel: E = "Down", className: D = "", width: O, maxWidth: k = "620px", fullWidth: A = !1, showGlow: j = !0, showEyebrow: M = !0, showPulse: N = !0, showRootStatus: P = !0, showServiceType: F = !0, eyebrowText: I, rootStatusText: L, showSummary: R = !0, summaryLabels: z }) {
	let [B, V] = n([]), [H, U] = n(null), [W, G] = n(!0), [K, q] = n(!1), [J, Y] = n(null);
	async function X(e = !1) {
		try {
			e && q(!0);
			let t = await c(d, u);
			V(t.services), U(t.checkedAt), Y(null);
		} catch {
			Y("Failed to load service status");
		} finally {
			G(!1), q(!1);
		}
	}
	e(() => {
		if (X(), !g) return;
		let e = window.setInterval(() => {
			X(!0);
		}, g);
		return () => window.clearInterval(e);
	}, [
		d,
		g,
		JSON.stringify(u)
	]);
	let Z = t(() => s(B), [B]), Q = t(() => {
		let e = W ? [] : B;
		return {
			total: W ? u.length : e.length,
			online: e.filter((e) => e.status === "online").length,
			degraded: e.filter((e) => e.status === "degraded").length,
			avgLatency: e.length > 0 ? Math.round(e.reduce((e, t) => e + (t.responseTime ?? 0), 0) / e.length) : 0
		};
	}, [
		B,
		W,
		u.length
	]), te = {
		"--usenov-status-accent": ee,
		"--usenov-status-bg": h?.background,
		"--usenov-status-card-bg": h?.cardBackground,
		"--usenov-status-text": h?.text,
		"--usenov-status-muted": h?.mutedText,
		"--usenov-status-border": h?.border,
		"--usenov-status-online": h?.online,
		"--usenov-status-degraded": h?.degraded,
		"--usenov-status-down": h?.down,
		"--usenov-status-width": A ? "100%" : O,
		"--usenov-status-max-width": A ? "100%" : k,
		"--usenov-status-glow-opacity": j ? "0.16" : "0"
	}, ne = {
		onlineLabel: w,
		degradedLabel: T,
		downLabel: E
	}, $ = p === "modern";
	return /* @__PURE__ */ i("section", {
		className: [
			"usenov-status-widget",
			`usenov-status-widget--${f}`,
			`usenov-status-widget--${m}`,
			`usenov-status-widget--appearance-${p}`,
			D
		].join(" "),
		style: te,
		children: [
			x && /* @__PURE__ */ i("header", {
				className: "usenov-status-widget__header",
				children: [/* @__PURE__ */ i("div", { children: [
					M && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__eyebrow",
						children: K ? $ ? "Checking services..." : "Refreshing" : I ?? ($ ? "Live monitoring" : "Live status")
					}),
					S && /* @__PURE__ */ r("h3", {
						className: "usenov-status-widget__title",
						children: l
					}),
					P && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__subtitle",
						children: W ? "Checking services..." : L ?? Z
					}),
					b && H && $ && /* @__PURE__ */ i("p", {
						className: "usenov-status-widget__updated usenov-status-widget__updated--header",
						children: ["Last updated: ", new Date(H).toLocaleTimeString()]
					})
				] }), N && !$ && /* @__PURE__ */ r("span", { className: "usenov-status-widget__pulse" })]
			}),
			J && /* @__PURE__ */ r("div", {
				className: "usenov-status-widget__error",
				children: J
			}),
			$ && R && /* @__PURE__ */ i("div", {
				className: "usenov-status-widget__summary",
				children: [
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: z?.total ?? "Services" }), /* @__PURE__ */ r("strong", { children: Q.total })]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: z?.online ?? "Operational" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--online",
							children: Q.online
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: z?.degraded ?? "Degraded" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--degraded",
							children: Q.degraded
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: z?.avgLatency ?? "Avg latency" }), /* @__PURE__ */ i("strong", { children: [Q.avgLatency, " ms"] })]
					})
				]
			}),
			/* @__PURE__ */ i("div", {
				className: "usenov-status-widget__list",
				children: [W && u.map((e) => /* @__PURE__ */ i("article", {
					className: [
						"usenov-status-widget__service",
						"usenov-status-widget__service--loading",
						C ? "usenov-status-widget__service--hover" : ""
					].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-info",
						children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
					}), /* @__PURE__ */ r("div", { className: "usenov-status-widget__skeleton" })]
				}, e.url)), !W && B.map((e) => /* @__PURE__ */ i("article", {
					className: ["usenov-status-widget__service", C ? "usenov-status-widget__service--hover" : ""].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-top",
						children: [/* @__PURE__ */ i("div", {
							className: "usenov-status-widget__service-info",
							children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
						}), /* @__PURE__ */ r("span", {
							className: ["usenov-status-widget__badge", `usenov-status-widget__badge--${e.status}`].join(" "),
							children: o(e.status, ne)
						})]
					}), /* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-stats",
						children: [
							y && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Status code" }), /* @__PURE__ */ r("strong", { children: e.statusCode ?? "--" })]
							}),
							v && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Response time" }), /* @__PURE__ */ i("strong", { children: [e.responseTime ?? "--", " ms"] })]
							}),
							F && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Type" }), /* @__PURE__ */ r("strong", { children: e.type ?? "website" })]
							})
						]
					})]
				}, `${e.name}-${e.url}`))]
			}),
			b && H && !$ && /* @__PURE__ */ i("p", {
				className: "usenov-status-widget__updated",
				children: ["Last updated: ", new Date(H).toLocaleTimeString()]
			})
		]
	});
}
//#endregion
export { l as StatusWidget };
