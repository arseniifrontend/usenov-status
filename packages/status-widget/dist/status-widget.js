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
function l({ title: l = "System Status", services: u, apiUrl: d = a, theme: f = "glass", appearance: p = "default", accentColor: m = "#22c55e", rounded: h = "2xl", colors: g, refreshInterval: _ = 3e4, showUrls: v = !0, showResponseTime: y = !0, showStatusCode: b = !1, showLastUpdated: x = !0, showHeader: S = !0, enableHover: C = !0, onlineLabel: w = "Operational", degradedLabel: T = "Degraded", downLabel: E = "Down", className: D = "", width: O, maxWidth: k = "620px", fullWidth: A = !1, showGlow: j = !0, showEyebrow: M = !0, showPulse: N = !0, showRootStatus: P = !0, showSummary: F = !0, summaryLabels: I }) {
	let [L, R] = n([]), [z, B] = n(null), [V, H] = n(!0), [U, W] = n(!1), [G, K] = n(null);
	async function q(e = !1) {
		try {
			e && W(!0);
			let t = await c(d, u);
			R(t.services), B(t.checkedAt), K(null);
		} catch {
			K("Failed to load service status");
		} finally {
			H(!1), W(!1);
		}
	}
	e(() => {
		if (q(), !_) return;
		let e = window.setInterval(() => {
			q(!0);
		}, _);
		return () => window.clearInterval(e);
	}, [
		d,
		_,
		JSON.stringify(u)
	]);
	let J = t(() => s(L), [L]), Y = t(() => {
		let e = V ? [] : L;
		return {
			total: V ? u.length : e.length,
			online: e.filter((e) => e.status === "online").length,
			degraded: e.filter((e) => e.status === "degraded").length,
			avgLatency: e.length > 0 ? Math.round(e.reduce((e, t) => e + (t.responseTime ?? 0), 0) / e.length) : 0
		};
	}, [
		L,
		V,
		u.length
	]), X = {
		"--usenov-status-accent": m,
		"--usenov-status-bg": g?.background,
		"--usenov-status-card-bg": g?.cardBackground,
		"--usenov-status-text": g?.text,
		"--usenov-status-muted": g?.mutedText,
		"--usenov-status-border": g?.border,
		"--usenov-status-online": g?.online,
		"--usenov-status-degraded": g?.degraded,
		"--usenov-status-down": g?.down,
		"--usenov-status-width": A ? "100%" : O,
		"--usenov-status-max-width": A ? "100%" : k,
		"--usenov-status-glow-opacity": j ? "0.16" : "0"
	}, Z = {
		onlineLabel: w,
		degradedLabel: T,
		downLabel: E
	}, Q = p === "modern";
	return /* @__PURE__ */ i("section", {
		className: [
			"usenov-status-widget",
			`usenov-status-widget--${f}`,
			`usenov-status-widget--${h}`,
			`usenov-status-widget--appearance-${p}`,
			D
		].join(" "),
		style: X,
		children: [
			S && /* @__PURE__ */ i("header", {
				className: "usenov-status-widget__header",
				children: [/* @__PURE__ */ i("div", { children: [
					M && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__eyebrow",
						children: U ? Q ? "Checking services..." : "Refreshing" : Q ? "Live monitoring" : "Live status"
					}),
					/* @__PURE__ */ r("h3", {
						className: "usenov-status-widget__title",
						children: l
					}),
					P && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__subtitle",
						children: V ? "Checking services..." : J
					}),
					x && z && Q && /* @__PURE__ */ i("p", {
						className: "usenov-status-widget__updated usenov-status-widget__updated--header",
						children: ["Last updated: ", new Date(z).toLocaleTimeString()]
					})
				] }), N && !Q && /* @__PURE__ */ r("span", { className: "usenov-status-widget__pulse" })]
			}),
			G && /* @__PURE__ */ r("div", {
				className: "usenov-status-widget__error",
				children: G
			}),
			Q && F && /* @__PURE__ */ i("div", {
				className: "usenov-status-widget__summary",
				children: [
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: I?.total ?? "Services" }), /* @__PURE__ */ r("strong", { children: Y.total })]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: I?.online ?? "Operational" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--online",
							children: Y.online
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: I?.degraded ?? "Degraded" }), /* @__PURE__ */ r("strong", {
							className: "usenov-status-widget__summary-value--degraded",
							children: Y.degraded
						})]
					}),
					/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__summary-card",
						children: [/* @__PURE__ */ r("p", { children: I?.avgLatency ?? "Avg latency" }), /* @__PURE__ */ i("strong", { children: [Y.avgLatency, " ms"] })]
					})
				]
			}),
			/* @__PURE__ */ i("div", {
				className: "usenov-status-widget__list",
				children: [V && u.map((e) => /* @__PURE__ */ i("article", {
					className: [
						"usenov-status-widget__service",
						"usenov-status-widget__service--loading",
						C ? "usenov-status-widget__service--hover" : ""
					].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-info",
						children: [/* @__PURE__ */ r("strong", { children: e.name }), v && /* @__PURE__ */ r("span", { children: e.url })]
					}), /* @__PURE__ */ r("div", { className: "usenov-status-widget__skeleton" })]
				}, e.url)), !V && L.map((e) => /* @__PURE__ */ i("article", {
					className: ["usenov-status-widget__service", C ? "usenov-status-widget__service--hover" : ""].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-top",
						children: [/* @__PURE__ */ i("div", {
							className: "usenov-status-widget__service-info",
							children: [/* @__PURE__ */ r("strong", { children: e.name }), v && /* @__PURE__ */ r("span", { children: e.url })]
						}), /* @__PURE__ */ r("span", {
							className: ["usenov-status-widget__badge", `usenov-status-widget__badge--${e.status}`].join(" "),
							children: o(e.status, Z)
						})]
					}), /* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-stats",
						children: [
							b && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Status code" }), /* @__PURE__ */ r("strong", { children: e.statusCode ?? "--" })]
							}),
							y && /* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Response time" }), /* @__PURE__ */ i("strong", { children: [e.responseTime ?? "--", " ms"] })]
							}),
							/* @__PURE__ */ i("div", {
								className: "usenov-status-widget__stat",
								children: [/* @__PURE__ */ r("span", { children: "Type" }), /* @__PURE__ */ r("strong", { children: e.type ?? "website" })]
							})
						]
					})]
				}, `${e.name}-${e.url}`))]
			}),
			x && z && !Q && /* @__PURE__ */ i("p", {
				className: "usenov-status-widget__updated",
				children: ["Last updated: ", new Date(z).toLocaleTimeString()]
			})
		]
	});
}
//#endregion
export { l as StatusWidget };
