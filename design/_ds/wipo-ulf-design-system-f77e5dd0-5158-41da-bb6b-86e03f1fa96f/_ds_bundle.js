/* @ds-bundle: {"format":3,"namespace":"WIPOULFDesignSystem_f77e5d","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"EconomySelect","sourcePath":"components/core/EconomySelect.jsx"},{"name":"MetricStat","sourcePath":"components/core/MetricStat.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"e9ab520cfe23","components/core/Button.jsx":"32d8a2bd756f","components/core/Card.jsx":"bd2462a709d8","components/core/EconomySelect.jsx":"24040b6342d1","components/core/MetricStat.jsx":"c0cf87a57395","components/navigation/SiteHeader.jsx":"41e0d35baf5e","ui_kits/wipo-ico/HeroVariantA.jsx":"e4a05f92ddb4","ui_kits/wipo-ico/HeroVariantB.jsx":"ad151d248dcf","ui_kits/wipo-ico/HeroVariantC.jsx":"7c850294da4c","ui_kits/wipo-ico/wipoData.js":"81f948a8a300"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WIPOULFDesignSystem_f77e5d = window.WIPOULFDesignSystem_f77e5d || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
/**
 * WIPO ULF Badge / Tag. Solid or soft fill, paired with a text label.
 * Use for the strategic "Pathway" label and category chips.
 */
function Badge({
  children,
  color = "var(--wipo-blue)",
  soft = false,
  icon = null,
  size = "md",
  style = {}
}) {
  const sizes = {
    sm: {
      fontSize: 12,
      padding: "3px 8px",
      gap: 5
    },
    md: {
      fontSize: 14,
      padding: "5px 12px",
      gap: 6
    },
    lg: {
      fontSize: 16,
      padding: "7px 16px",
      gap: 7
    }
  };
  const s = sizes[size] || sizes.md;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: s.gap,
      fontFamily: "var(--font-sans)",
      fontWeight: 600,
      fontSize: s.fontSize,
      lineHeight: 1.2,
      padding: s.padding,
      borderRadius: 999,
      background: soft ? "color-mix(in srgb, " + color + " 12%, #ffffff)" : color,
      color: soft ? color : "#ffffff",
      border: soft ? `1px solid color-mix(in srgb, ${color} 30%, #ffffff)` : "1px solid transparent",
      whiteSpace: "nowrap",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${icon}`,
    "aria-hidden": "true"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * WIPO ULF Button.
 * Flat, no shadow. Primary = solid WIPO blue; pill option for hero CTAs.
 */
function Button({
  children,
  variant = "primary",
  size = "md",
  pill = false,
  icon = null,
  iconRight = null,
  disabled = false,
  href = null,
  onClick,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      fontSize: 14,
      lineHeight: "23px",
      padding: "6px 14px",
      gap: 6
    },
    md: {
      fontSize: 16,
      lineHeight: "24px",
      padding: "10px 20px",
      gap: 8
    },
    lg: {
      fontSize: 18,
      lineHeight: "24px",
      padding: "14px 28px",
      gap: 10
    }
  };
  const palette = {
    primary: {
      bg: "#0059c6",
      color: "#ffffff",
      border: "1px solid #0059c6",
      hover: "#004294"
    },
    secondary: {
      bg: "#ffffff",
      color: "#0059c6",
      border: "1px solid #0059c6",
      hover: "#f5f9ff"
    },
    ghost: {
      bg: "transparent",
      color: "#0059c6",
      border: "1px solid transparent",
      hover: "#f5f9ff"
    },
    dark: {
      bg: "#1c1c1c",
      color: "#ffffff",
      border: "1px solid #1c1c1c",
      hover: "#303030"
    }
  };
  const p = palette[variant] || palette.primary;
  const s = sizes[size] || sizes.md;
  const [hover, setHover] = React.useState(false);
  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: s.fontSize,
    lineHeight: s.lineHeight,
    padding: s.padding,
    borderRadius: pill ? 999 : 4,
    border: p.border,
    background: disabled ? "#e3e3e3" : hover ? p.hover : p.bg,
    color: disabled ? "#969696" : p.color,
    borderColor: disabled ? "#e3e3e3" : undefined,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "background 120ms ease, color 120ms ease",
    textDecoration: "none",
    whiteSpace: "nowrap",
    ...style
  };
  const inner = /*#__PURE__*/React.createElement(React.Fragment, null, icon && /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${icon}`,
    "aria-hidden": "true"
  }), children, iconRight && /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${iconRight}`,
    "aria-hidden": "true"
  }));
  const handlers = {
    onMouseEnter: () => !disabled && setHover(true),
    onMouseLeave: () => setHover(false)
  };
  if (href && !disabled) {
    return /*#__PURE__*/React.createElement("a", _extends({
      href: href,
      style: baseStyle
    }, handlers, rest), inner);
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    style: baseStyle,
    disabled: disabled,
    onClick: onClick
  }, handlers, rest), inner);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * WIPO ULF Card. Flat surface with a thin border, no shadow.
 * Optional colored top bar (Aqua / Lime / Orange) per ULF card patterns.
 */
function Card({
  children,
  topColor = null,
  padding = 24,
  interactive = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderTop: topColor ? `4px solid ${topColor}` : "1px solid var(--border-subtle)",
      borderRadius: 4,
      padding,
      transition: "border-color 120ms ease, background 120ms ease",
      cursor: interactive ? "pointer" : "default",
      borderColor: interactive && hover ? "var(--wipo-blue)" : undefined,
      ...style
    },
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => setHover(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/EconomySelect.jsx
try { (() => {
/**
 * WIPO ULF Economy selector — the primary interactive element of the
 * Innovation Capabilities Navigator. A searchable dropdown styled as a
 * blue pill (hero) or bordered field (inline). Flat, no shadow except a
 * thin border on the open panel.
 */
function EconomySelect({
  options = [],
  value = null,
  onChange,
  placeholder = "Select an economy",
  variant = "pill",
  // "pill" | "field"
  size = "lg",
  block = false,
  searchable = true,
  style = {}
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    function onDoc(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const selected = options.find(o => o.id === value) || null;
  const label = selected ? selected.name : placeholder;
  const filtered = query ? options.filter(o => o.name.toLowerCase().includes(query.toLowerCase())) : options;
  const sizes = {
    md: {
      fontSize: 16,
      padding: variant === "pill" ? "10px 18px" : "9px 14px",
      h: 44
    },
    lg: {
      fontSize: 18,
      padding: variant === "pill" ? "14px 24px" : "12px 18px",
      h: 52
    }
  };
  const s = sizes[size] || sizes.lg;
  const isPill = variant === "pill";
  const triggerStyle = {
    display: "inline-flex",
    width: block ? "100%" : "auto",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    fontFamily: "var(--font-sans)",
    fontWeight: 500,
    fontSize: s.fontSize,
    padding: s.padding,
    minHeight: s.h,
    cursor: "pointer",
    borderRadius: isPill ? 999 : 4,
    background: isPill ? selected ? "#ffffff" : "#0059c6" : "#ffffff",
    color: isPill ? selected ? "#0059c6" : "#ffffff" : "#1c1c1c",
    border: isPill ? selected ? "1px solid #0059c6" : "1px solid #0059c6" : "1px solid #969696",
    transition: "background 120ms ease, color 120ms ease",
    ...style
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: rootRef,
    style: {
      position: "relative",
      width: block ? "100%" : "auto",
      display: "inline-block"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    "aria-haspopup": "listbox",
    "aria-expanded": open,
    style: triggerStyle,
    onClick: () => setOpen(v => !v),
    onKeyDown: e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(v => !v);
      }
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10
    }
  }, variant === "field" && /*#__PURE__*/React.createElement("i", {
    className: "bi bi-globe2",
    "aria-hidden": "true",
    style: {
      color: "#0059c6"
    }
  }), label), /*#__PURE__*/React.createElement("i", {
    className: `bi bi-chevron-${open ? "up" : "down"}`,
    "aria-hidden": "true",
    style: {
      fontSize: 14,
      opacity: 0.9
    }
  })), open && /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    style: {
      position: "absolute",
      top: "calc(100% + 6px)",
      left: 0,
      width: block ? "100%" : 320,
      maxHeight: 320,
      overflowY: "auto",
      background: "#ffffff",
      border: "1px solid #e3e3e3",
      borderRadius: 8,
      zIndex: 40
    }
  }, searchable && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 8,
      borderBottom: "1px solid #e3e3e3",
      position: "sticky",
      top: 0,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-search",
    "aria-hidden": "true",
    style: {
      position: "absolute",
      left: 12,
      top: "50%",
      transform: "translateY(-50%)",
      color: "#727272",
      fontSize: 14
    }
  }), /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: query,
    onChange: e => setQuery(e.target.value),
    placeholder: "Search economies",
    style: {
      width: "100%",
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      padding: "9px 12px 9px 34px",
      border: "1px solid #e3e3e3",
      borderRadius: 4,
      outline: "none"
    }
  }))), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 4
    }
  }, filtered.map(o => {
    const active = o.id === value;
    return /*#__PURE__*/React.createElement("li", {
      key: o.id
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      role: "option",
      "aria-selected": active,
      onClick: () => {
        onChange && onChange(o.id);
        setOpen(false);
        setQuery("");
      },
      style: {
        width: "100%",
        textAlign: "left",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        fontFamily: "var(--font-sans)",
        fontSize: 15,
        padding: "9px 12px",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
        background: active ? "#f5f9ff" : "transparent",
        color: active ? "#0059c6" : "#303030",
        fontWeight: active ? 600 : 400
      },
      onMouseEnter: e => {
        if (!active) e.currentTarget.style.background = "#f0f0f0";
      },
      onMouseLeave: e => {
        if (!active) e.currentTarget.style.background = "transparent";
      }
    }, /*#__PURE__*/React.createElement("span", null, o.name), active && /*#__PURE__*/React.createElement("i", {
      className: "bi bi-check2",
      "aria-hidden": "true"
    })));
  }), filtered.length === 0 && /*#__PURE__*/React.createElement("li", {
    style: {
      padding: "12px",
      color: "#727272",
      fontSize: 14
    }
  }, "No economies found"))));
}
Object.assign(__ds_scope, { EconomySelect });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/EconomySelect.jsx", error: String((e && e.message) || e) }); }

// components/core/MetricStat.jsx
try { (() => {
/**
 * WIPO ULF metric stat — a single innovation-profile figure
 * (Relevance, Diversity, Sophistication, Opportunities, Pathway).
 * Flat block; an accent top-rule pairs color with the label text so
 * color never conveys meaning alone.
 */
function MetricStat({
  label,
  value,
  unit = null,
  icon = null,
  accent = "var(--wipo-blue)",
  emphasis = false,
  layout = "stack",
  // "stack" | "inline"
  style = {}
}) {
  const isInline = layout === "inline";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: isInline ? "row" : "column",
      alignItems: isInline ? "center" : "flex-start",
      justifyContent: isInline ? "space-between" : "flex-start",
      gap: isInline ? 16 : 8,
      padding: emphasis ? "20px 22px" : "18px 20px",
      background: emphasis ? "var(--surface-brand-soft)" : "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderTop: `3px solid ${accent}`,
      borderRadius: 4,
      minWidth: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, icon && /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${icon}`,
    "aria-hidden": "true",
    style: {
      color: accent,
      fontSize: 16
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-muted)",
      letterSpacing: "0.01em"
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: emphasis ? 30 : 28,
      fontWeight: 600,
      lineHeight: 1.1,
      color: "var(--text-strong)"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 14,
      color: "var(--text-subtle)"
    }
  }, unit)));
}
Object.assign(__ds_scope, { MetricStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/MetricStat.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
/**
 * WIPO site header (minimal/application mode). White bar, WIPO wordmark,
 * right-aligned nav links + language selector. Flat, single hairline border.
 * The official logo is a heavy geometric wordmark; rendered here as styled text.
 */
function SiteHeader({
  links = [],
  showLanguage = true,
  loginLabel = "WIPO Login",
  onLogin,
  style = {}
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "#ffffff",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px",
      height: 64,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    className: "ulf-wordmark",
    style: {
      textDecoration: "none"
    }
  }, "WIPO"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.label,
    href: l.href || "#",
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-body)",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, l.label, l.caret && /*#__PURE__*/React.createElement("i", {
    className: "bi bi-chevron-down",
    "aria-hidden": "true",
    style: {
      fontSize: 12
    }
  }))), showLanguage && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-body)",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-globe2",
    "aria-hidden": "true",
    style: {
      fontSize: 14
    }
  }), "EN", /*#__PURE__*/React.createElement("i", {
    className: "bi bi-chevron-down",
    "aria-hidden": "true",
    style: {
      fontSize: 12
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onLogin,
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: 15,
      fontWeight: 500,
      color: "var(--text-link)",
      background: "#ffffff",
      border: "1px solid var(--wipo-blue)",
      borderRadius: 999,
      padding: "7px 18px",
      cursor: "pointer"
    }
  }, loginLabel))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wipo-ico/HeroVariantA.jsx
try { (() => {
// Variant A — "Data-first hero"
// Network/bubble preview of the real tool replaces decorative background.
// Selector prominent & above the fold; metric summary appears INLINE below it.
const {
  useState: useStateA
} = React;
function InlineMetricStrip({
  metrics
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 4,
      overflow: "hidden",
      background: "#fff"
    }
  }, metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.key,
    style: {
      padding: "16px 18px",
      borderLeft: i === 0 ? "none" : "1px solid var(--border-subtle)",
      borderTop: `3px solid ${m.accent}`,
      background: m.emphasis ? "var(--surface-brand-soft)" : "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${m.icon}`,
    style: {
      color: m.accent,
      fontSize: 14
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: "var(--text-muted)"
    }
  }, m.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: m.isPathway ? 16 : 26,
      fontWeight: 600,
      lineHeight: 1.15,
      color: "var(--text-strong)"
    }
  }, m.value, m.unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 400,
      color: "var(--text-subtle)"
    }
  }, " ", m.unit)))));
}
function HeroVariantA({
  seed
}) {
  const {
    EconomySelect,
    SiteHeader,
    Button,
    Badge
  } = window.WIPOULFDesignSystem_f77e5d;
  const [eco, setEco] = useStateA(seed || null);
  const profile = eco ? window.WIPO_PROFILE[eco] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      background: "#fff",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: [{
      label: "Help",
      caret: true
    }, {
      label: "About the data"
    }],
    loginLabel: "WIPO Login"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "56px 24px 64px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "ulf-eyebrow",
    style: {
      marginBottom: 14
    }
  }, "Innovation Capabilities Navigator"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 38,
      lineHeight: "46px",
      fontWeight: 500,
      color: "var(--text-strong)",
      margin: "0 0 16px",
      textWrap: "balance"
    }
  }, "Innovation Capabilities Outlook 2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: "27px",
      color: "var(--text-muted)",
      margin: "0 0 28px",
      maxWidth: 480
    }
  }, "Map the innovation strengths of 196 economies \u2014 and find where opportunities lie."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-muted)",
      marginBottom: 8
    }
  }, "Select an economy to explore its profile"), /*#__PURE__*/React.createElement(EconomySelect, {
    options: window.WIPO_COUNTRIES,
    value: eco,
    onChange: setEco,
    variant: "field",
    size: "lg",
    block: true,
    placeholder: "Select an economy"
  }), profile && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, profile.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)"
    }
  }, profile.meta)), /*#__PURE__*/React.createElement(InlineMetricStrip, {
    metrics: profile.metrics
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right"
  }, "Open full profile")))), /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: 8,
      background: "var(--surface-offwhite)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-subtle)",
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-diagram-3 me-1",
    "aria-hidden": "true",
    style: {
      color: "var(--wipo-blue)"
    }
  }), " Capability network \xB7 ~45 domains"), /*#__PURE__*/React.createElement(Badge, {
    color: "var(--wipo-aqua)",
    soft: true,
    size: "sm"
  }, "Live preview")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 8
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/wipo-capability-network.png",
    alt: "Force-directed network of innovation capability domains",
    style: {
      display: "block",
      width: "100%",
      height: "auto",
      opacity: profile ? 1 : 0.92
    }
  }), !profile && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 8,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      background: "rgba(255,255,255,0.92)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 999,
      padding: "8px 16px",
      fontSize: 13,
      color: "var(--text-muted)",
      marginBottom: 16
    }
  }, "Select an economy to highlight its strengths")))))));
}
window.HeroVariantA = HeroVariantA;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wipo-ico/HeroVariantA.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wipo-ico/HeroVariantB.jsx
try { (() => {
// Variant B — "Editorial with strong CTA"
// Clean white, large H1, 2–3 sentence intro. Selector = dominant pill.
// Metric summary = compact horizontal scorecard. No decorative background.
const {
  useState: useStateB
} = React;
function Scorecard({
  profile
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      maxWidth: 880,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14,
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 600,
      color: "var(--text-strong)"
    }
  }, profile.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-subtle)"
    }
  }, "\xB7 ", profile.meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      border: "1px solid var(--border-subtle)",
      borderRadius: 6,
      overflow: "hidden"
    }
  }, profile.metrics.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: m.key,
    style: {
      padding: "18px 16px",
      textAlign: "center",
      borderLeft: i === 0 ? "none" : "1px solid var(--border-subtle)",
      background: m.emphasis ? "var(--surface-brand-soft)" : "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${m.icon}`,
    style: {
      color: m.accent,
      fontSize: 14
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.02em",
      color: "var(--text-muted)"
    }
  }, m.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: m.isPathway ? 15 : 28,
      fontWeight: 600,
      lineHeight: 1.15,
      color: "var(--text-strong)"
    }
  }, m.value), m.unit && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: "var(--text-subtle)",
      marginTop: 2
    }
  }, m.unit)))));
}
function HeroVariantB({
  seed
}) {
  const {
    EconomySelect,
    SiteHeader,
    Button
  } = window.WIPOULFDesignSystem_f77e5d;
  const [eco, setEco] = useStateB(seed || null);
  const profile = eco ? window.WIPO_PROFILE[eco] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      background: "#fff",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: [{
      label: "Help",
      caret: true
    }, {
      label: "About the data"
    }],
    loginLabel: "WIPO Login"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 820,
      margin: "0 auto",
      padding: "72px 24px 80px",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ulf-eyebrow",
    style: {
      marginBottom: 18
    }
  }, "Innovation Capabilities Outlook 2026"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: 44,
      lineHeight: "54px",
      fontWeight: 500,
      color: "var(--text-strong)",
      margin: "0 0 22px",
      textWrap: "balance"
    }
  }, "Map the innovation strengths of 196 economies \u2014 and find where opportunities lie."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: "28px",
      color: "var(--text-muted)",
      margin: "0 auto 36px",
      maxWidth: 640
    }
  }, "The Innovation Capabilities Outlook maps global innovation ecosystems using data from patents, trademarks, publications and exports. Select an economy to explore its profile."), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 520,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(EconomySelect, {
    options: window.WIPO_COUNTRIES,
    value: eco,
    onChange: setEco,
    variant: "pill",
    size: "lg",
    block: true,
    placeholder: "Select an economy"
  }), !profile && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)",
      marginTop: 12
    }
  }, "196 economies \xB7 scored on relevance, diversity and sophistication")), profile && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 40,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement(Scorecard, {
    profile: profile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right"
  }, "Open ", profile.name, "'s full profile")))));
}
window.HeroVariantB = HeroVariantB;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wipo-ico/HeroVariantB.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wipo-ico/HeroVariantC.jsx
try { (() => {
// Variant C — "Country-first" (inspired by IMF DataMapper / Our World in Data)
// The selector is the FIRST thing on the page. Selection reveals the metric
// summary prominently. Title + description are secondary, shown below.
const {
  useState: useStateC
} = React;
function BigMetric({
  m
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 22px",
      borderTop: `3px solid ${m.accent}`,
      border: "1px solid var(--border-subtle)",
      borderTopWidth: 3,
      borderRadius: 4,
      background: m.emphasis ? "var(--surface-brand-soft)" : "#fff"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: `bi bi-${m.icon}`,
    style: {
      color: m.accent,
      fontSize: 16
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: "var(--text-muted)"
    }
  }, m.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: m.isPathway ? 20 : 38,
      fontWeight: 600,
      lineHeight: 1.1,
      color: "var(--text-strong)"
    }
  }, m.value), m.unit && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: "var(--text-subtle)",
      marginTop: 4
    }
  }, m.unit));
}
function HeroVariantC({
  seed
}) {
  const {
    EconomySelect,
    SiteHeader,
    Button,
    Badge
  } = window.WIPOULFDesignSystem_f77e5d;
  const [eco, setEco] = useStateC(seed || null);
  const profile = eco ? window.WIPO_PROFILE[eco] : null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1280,
      background: "#fff",
      fontFamily: "var(--font-sans)"
    }
  }, /*#__PURE__*/React.createElement(SiteHeader, {
    links: [{
      label: "Help",
      caret: true
    }, {
      label: "About the data"
    }],
    loginLabel: "WIPO Login"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-brand-soft)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "40px 24px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ulf-eyebrow",
    style: {
      marginBottom: 12
    }
  }, "Innovation Capabilities Navigator"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 20,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "1 1 520px"
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      fontSize: 22,
      fontWeight: 500,
      color: "var(--text-strong)",
      marginBottom: 14
    }
  }, "Which economy do you want to explore?"), /*#__PURE__*/React.createElement(EconomySelect, {
    options: window.WIPO_COUNTRIES,
    value: eco,
    onChange: setEco,
    variant: "field",
    size: "lg",
    block: true,
    placeholder: "Select an economy"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: "0 0 auto",
      paddingBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: "var(--text-subtle)"
    }
  }, "196 economies \xB7 45 capability domains"))))), profile ? /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "44px 24px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      marginBottom: 22
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 32,
      fontWeight: 500,
      color: "var(--text-strong)",
      margin: 0
    }
  }, profile.name), /*#__PURE__*/React.createElement(Badge, {
    color: "var(--wipo-cherry)",
    icon: "signpost-split"
  }, "Smart diversification"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-subtle)",
      marginLeft: "auto"
    }
  }, profile.meta)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(5, 1fr)",
      gap: 14
    }
  }, profile.metrics.map(m => /*#__PURE__*/React.createElement(BigMetric, {
    key: m.key,
    m: m
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconRight: "arrow-right"
  }, "Open full profile"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    style: {
      marginLeft: 8
    }
  }, "Compare economies"))) : /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "44px 24px 16px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      border: "1px dashed var(--border-strong)",
      borderRadius: 6,
      padding: "40px 24px",
      textAlign: "center",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bi bi-bar-chart-line",
    style: {
      fontSize: 28,
      color: "var(--wipo-blue)"
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      margin: "12px 0 0"
    }
  }, "Choose an economy above to reveal its innovation profile."))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "28px 24px 64px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      paddingTop: 28,
      display: "grid",
      gridTemplateColumns: "1fr 1.4fr",
      gap: 40
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: 24,
      fontWeight: 500,
      color: "var(--text-strong)",
      margin: 0
    }
  }, "Innovation Capabilities Outlook 2026"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--text-muted)",
      margin: 0
    }
  }, "The Innovation Capabilities Outlook maps global innovation ecosystems using data from patents, trademarks, publications and exports. Select an economy to explore its profile."))));
}
window.HeroVariantC = HeroVariantC;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wipo-ico/HeroVariantC.jsx", error: String((e && e.message) || e) }); }

// ui_kits/wipo-ico/wipoData.js
try { (() => {
// Shared mock data for the WIPO Innovation Capabilities Navigator homepage mocks.
window.WIPO_COUNTRIES = [{
  id: "lu",
  name: "Luxembourg"
}, {
  id: "ch",
  name: "Switzerland"
}, {
  id: "se",
  name: "Sweden"
}, {
  id: "us",
  name: "United States of America"
}, {
  id: "sg",
  name: "Singapore"
}, {
  id: "kr",
  name: "Republic of Korea"
}, {
  id: "jp",
  name: "Japan"
}, {
  id: "de",
  name: "Germany"
}, {
  id: "gb",
  name: "United Kingdom"
}, {
  id: "nl",
  name: "Netherlands"
}, {
  id: "fi",
  name: "Finland"
}, {
  id: "dk",
  name: "Denmark"
}, {
  id: "fr",
  name: "France"
}, {
  id: "cn",
  name: "China"
}, {
  id: "il",
  name: "Israel"
}, {
  id: "ca",
  name: "Canada"
}, {
  id: "ie",
  name: "Ireland"
}, {
  id: "at",
  name: "Austria"
}, {
  id: "be",
  name: "Belgium"
}, {
  id: "no",
  name: "Norway"
}, {
  id: "es",
  name: "Spain"
}, {
  id: "it",
  name: "Italy"
}, {
  id: "in",
  name: "India"
}, {
  id: "br",
  name: "Brazil"
}];

// Sample profile (Luxembourg) — the only filled economy in these mocks.
window.WIPO_PROFILE = {
  lu: {
    name: "Luxembourg",
    meta: "Europe · High income",
    metrics: [{
      key: "relevance",
      label: "Relevance",
      value: "0.2",
      unit: null,
      icon: "bullseye",
      accent: "var(--wipo-blue)",
      note: "Score"
    }, {
      key: "diversity",
      label: "Diversity",
      value: "35",
      unit: null,
      icon: "diagram-3",
      accent: "var(--wipo-aqua)",
      note: "Score"
    }, {
      key: "sophistication",
      label: "Sophistication",
      value: "87",
      unit: null,
      icon: "graph-up-arrow",
      accent: "var(--blue-3)",
      note: "Score"
    }, {
      key: "opportunities",
      label: "Opportunities",
      value: "40",
      unit: "domains",
      icon: "compass",
      accent: "var(--wipo-lime)",
      emphasis: true,
      note: "Actionable"
    }, {
      key: "pathway",
      label: "Pathway",
      value: "Smart diversification",
      unit: null,
      icon: "signpost-split",
      accent: "var(--wipo-cherry)",
      emphasis: true,
      isPathway: true,
      note: "Strategy"
    }]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/wipo-ico/wipoData.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.EconomySelect = __ds_scope.EconomySelect;

__ds_ns.MetricStat = __ds_scope.MetricStat;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

})();
