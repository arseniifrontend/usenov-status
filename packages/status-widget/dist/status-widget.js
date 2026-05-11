import { useEffect as e, useMemo as t, useState as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";
//#region src/StatusWidget.tsx
var a = "https://worker.usenov.workers.dev";
function o(e, t) {
	return e === "online" ? t.onlineLabel : e === "degraded" ? t.degradedLabel : t.downLabel;
}
function s(e) {
	return e.length === 0 ? "Checking services..." : e.some((e) => e.status === "down") ? "Major outage" : e.some((e) => e.status === "degraded") ? "Some services degraded" : "All systems operational";
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
function l({ title: l = "System Status", services: u, apiUrl: d = a, theme: f = "glass", accentColor: p = "#22c55e", rounded: m = "2xl", colors: h, refreshInterval: g = 3e4, showUrls: _ = !0, showResponseTime: v = !0, showStatusCode: y = !1, showLastUpdated: b = !0, showHeader: x = !0, enableHover: S = !0, onlineLabel: C = "Operational", degradedLabel: w = "Degraded", downLabel: T = "Down", className: E = "", width: D, maxWidth: O = "620px", fullWidth: k = !1, showGlow: A = !0, showEyebrow: j = !0, showPulse: M = !0, showRootStatus: N = !0 }) {
	let [P, F] = n([]), [I, L] = n(null), [R, z] = n(!0), [B, V] = n(!1), [H, U] = n(null);
	async function W(e = !1) {
		try {
			e && V(!0);
			let t = await c(d, u);
			F(t.services), L(t.checkedAt), U(null);
		} catch {
			U("Failed to load service status");
		} finally {
			z(!1), V(!1);
		}
	}
	e(() => {
		if (W(), !g) return;
		let e = window.setInterval(() => {
			W(!0);
		}, g);
		return () => window.clearInterval(e);
	}, [
		d,
		g,
		JSON.stringify(u)
	]);
	let G = t(() => s(P), [P]), K = {
		"--usenov-status-accent": p,
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
	}, q = {
		onlineLabel: C,
		degradedLabel: w,
		downLabel: T
	};
	return /* @__PURE__ */ i("section", {
		className: [
			"usenov-status-widget",
			`usenov-status-widget--${f}`,
			`usenov-status-widget--${m}`,
			E
		].join(" "),
		style: K,
		children: [
			x && /* @__PURE__ */ i("header", {
				className: "usenov-status-widget__header",
				children: [/* @__PURE__ */ i("div", { children: [
					j && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__eyebrow",
						children: B ? "Refreshing" : "Live status"
					}),
					/* @__PURE__ */ r("h3", {
						className: "usenov-status-widget__title",
						children: l
					}),
					N && /* @__PURE__ */ r("p", {
						className: "usenov-status-widget__subtitle",
						children: R ? "Checking services..." : G
					})
				] }), M && /* @__PURE__ */ r("span", { className: "usenov-status-widget__pulse" })]
			}),
			H && /* @__PURE__ */ r("div", {
				className: "usenov-status-widget__error",
				children: H
			}),
			/* @__PURE__ */ i("div", {
				className: "usenov-status-widget__list",
				children: [R && u.map((e) => /* @__PURE__ */ i("article", {
					className: [
						"usenov-status-widget__service",
						"usenov-status-widget__service--loading",
						S ? "usenov-status-widget__service--hover" : ""
					].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-info",
						children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
					}), /* @__PURE__ */ r("div", { className: "usenov-status-widget__skeleton" })]
				}, e.url)), !R && P.map((e) => /* @__PURE__ */ i("article", {
					className: ["usenov-status-widget__service", S ? "usenov-status-widget__service--hover" : ""].join(" "),
					children: [/* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-info",
						children: [/* @__PURE__ */ r("strong", { children: e.name }), _ && /* @__PURE__ */ r("span", { children: e.url })]
					}), /* @__PURE__ */ i("div", {
						className: "usenov-status-widget__service-meta",
						children: [
							y && /* @__PURE__ */ r("span", {
								className: "usenov-status-widget__code",
								children: e.statusCode ?? "--"
							}),
							v && /* @__PURE__ */ i("span", {
								className: "usenov-status-widget__latency",
								children: [e.responseTime ?? "--", " ms"]
							}),
							/* @__PURE__ */ r("span", {
								className: ["usenov-status-widget__badge", `usenov-status-widget__badge--${e.status}`].join(" "),
								children: o(e.status, q)
							})
						]
					})]
				}, `${e.name}-${e.url}`))]
			}),
			b && I && /* @__PURE__ */ i("p", {
				className: "usenov-status-widget__updated",
				children: ["Last updated: ", new Date(I).toLocaleTimeString()]
			})
		]
	});
}
//#endregion
export { l as StatusWidget };
