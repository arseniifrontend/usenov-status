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
function l({ title: l = "System Status", services: u, apiUrl: d = a, theme: f = "glass", appearance: p = "default", accentColor: ee = "#22c55e", rounded: m = "2xl", colors: h, refreshInterval: g = 3e4, showUrls: _ = !0, showResponseTime: v = !0, showStatusCode: y = !1, showLastUpdated: b = !0, showHeader: x = !0, enableHover: S = !0, onlineLabel: C = "Operational", degradedLabel: w = "Degraded", downLabel: T = "Down", className: E = "", width: D, maxWidth: O = "620px", fullWidth: k = !1, showGlow: A = !0, showEyebrow: j = !0, showPulse: M = !0, showRootStatus: N = !0, showServiceType: P = !0, eyebrowText: F, rootStatusText: I, showSummary: L = !0, summaryLabels: R }) {
	let [z, B] = n([]), [V, H] = n(null), [U, W] = n(!0), [G, K] = n(!1), [q, J] = n(null);
	async function Y(e = !1) {
		try {
			e && K(!0);
			let t = await c(d, u);
			B(t.services), H(t.checkedAt), J(null);
		} catch {
			J("Failed to load service status");
		} finally {
			W(!1), K(!1);
		}
	}
	e(() => {
		if (Y(), !g) return;
		let e = window.setInterval(() => {
			Y(!0);
		}, g);
		return () => window.clearInterval(e);
	}, [
		d,
		g,
		JSON.stringify(u)
	]);
	let X = t(() => s(z), [z]), Z = t(() => {
		let e = U ? [] : z;
		return {
			total: U ? u.length : e.length,
			online: e.filter((e) => e.status === "online").length,
			degraded: e.filter((e) => e.status === "degraded").length,
			avgLatency: e.length > 0 ? Math.round(e.reduce((e, t) => e + (t.responseTime ?? 0), 0) / e.length) : 0
		};
	}, [
		z,
		U,
		u.length
	]), Q = {
		"--usenov-status-accent": ee,
		"--usenov-status-bg": h?.background,
		"--usenov-status-card-bg": h?.cardBackground,
		"--usenov-status-text": h?.text,
		"--usenov-status-muted": h?.mutedText,
		"--usenov-status-border": h?.border,
		"--usenov-status-online": h?.online,
		"--usenov-status-degraded": h?.degraded,
		"--usenov-status-down": h?.down,
		"--usenov-status-width": k ? "100%" : D,
		"--usenov-status-max-width": k ? "100%" : O,
		"--usenov-status-glow-opacity": A ? "0.16" : "0"
	}, te = {
		onlineLabel: C,
		degradedLabel: w,
		downLabel: T
	}, $ = p === "modern";
	return /* @__PURE__ */ i("section", {
		className: [
			"usenov-status-widget",
			`usenov-status-widget--${f}`,
			`usenov-status-widget--${m}`,
			`usenov-status-widget--appearance-${p}`,
			E
		].join(" "),
		style: Q,
		children: [
			x && /* @__PURE__ */ i("header", {
				className: "usenov-status-widget__header",
				children: [/* @__PURE__ */ i("div", { children: [
					j && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__eyebrow",
						children: G ? $ ? "Checking services..." : "Refreshing" : F ?? ($ ? "Live monitoring" : "Live status")
					}),
					/* @__PURE__ */ r("h3", {
						className: "usenov-status-widget__title",
						children: l
					}),
					N && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__subtitle",
						children: U ? "Checking services..." : I ?? X
					}),
					b && V && $ && /* @__PURE__ */ i("p", {
						className: "usenov-status-widget__updated usenov-status-widget__updated--header",
						children: ["Last updated: ", new Date(V).toLocaleTimeString()]
					})
				] }), M && !$ && /* @__PURE__ */ r("span", { className: "usenov-status-widget__pulse" })]
			}),
			q && /* @__PURE__ */ r("div", {
				className: "usenov-status-widget__error",
				children: q
			}),
			$ && L && /* @__PURE__ */ i("div", {
				className: "usenov-status-widget__summary",
				children: [
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: R?.total ?? "Services" }), /* @__PURE__ */ r("strong", { children: Z.total })]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: R?.online ?? "Operational" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--online",
							children: Z.online
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: R?.degraded ?? "Degraded" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--degraded",
							children: Z.degraded
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: R?.avgLatency ?? "Avg latency" }), /* @__PURE__ */ i("strong", { children: [Z.avgLatency, " ms"] })]
					})
				]
			}),
			/* @__PURE__ */ i("div", {
				className: "usenov-status-widget__list",
				children: [U && u.map((e) => /* @__PURE__ */ i("article", {
					className: [
						"usenov-status-widget__service",
						"usenov-status-widget__service--loading",
						S ? "usenov-status-widget__service--hover" : ""
					].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-info",
						children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
					}), /* @__PURE__ */ r("div", { className: "usenov-status-widget__skeleton" })]
				}, e.url)), !U && z.map((e) => /* @__PURE__ */ i("article", {
					className: ["usenov-status-widget__service", S ? "usenov-status-widget__service--hover" : ""].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-top",
						children: [/* @__PURE__ */ i("div", {
							className: "usenov-status-widget__service-info",
							children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
						}), /* @__PURE__ */ r("span", {
							className: ["usenov-status-widget__badge", `usenov-status-widget__badge--${e.status}`].join(" "),
							children: o(e.status, te)
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
							P && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Type" }), /* @__PURE__ */ r("strong", { children: e.type ?? "website" })]
							})
						]
					})]
				}, `${e.name}-${e.url}`))]
			}),
			b && V && !$ && /* @__PURE__ */ i("p", {
				className: "usenov-status-widget__updated",
				children: ["Last updated: ", new Date(V).toLocaleTimeString()]
			})
		]
	});
}
//#endregion
export { l as StatusWidget };
