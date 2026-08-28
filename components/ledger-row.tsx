"use client";

import { formatEur } from "@/lib/format";
import type { FeedItem } from "@/lib/ledger";
import { useExpenseSheet } from "@/components/expense-sheet-provider";

export default function LedgerRow({
  item,
  isLast,
}: {
  item: FeedItem;
  isLast: boolean;
}) {
  const { openEdit } = useExpenseSheet();

  const deltaColor =
    item.delta === null
      ? "var(--c-sub)"
      : item.delta > 0
        ? "var(--c-pos)"
        : item.delta < 0
          ? "var(--c-neg)"
          : "var(--c-sub)";

  const editable = item.editable;

  return (
    <div
      onClick={
        editable
          ? () =>
              openEdit({
                id: item.id,
                amount: item.amount,
                description: item.title,
                payerId: editable.payerId,
                categoryId: editable.categoryId,
                groupId: editable.groupId,
                mySharePercent: editable.mySharePercent,
              })
          : undefined
      }
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 16px",
        borderBottom: isLast ? "none" : "1px solid var(--c-border)",
        cursor: editable ? "pointer" : "default",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          flex: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
          background: "var(--c-chip)",
          color: "var(--c-body)",
          fontSize: 16,
        }}
      >
        <i className={`bi bi-${item.icon ?? "receipt"}`} />
      </div>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          minWidth: 0,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500 }}>{item.title}</span>
        <span style={{ fontSize: 12, color: "var(--c-sub)" }}>
          {item.subtitle}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 500 }}>
          {formatEur(item.amount)}
        </span>
        <span style={{ fontSize: 11, color: deltaColor }}>
          {item.deltaLabel}
        </span>
      </div>
      {editable && (
        <i
          className="bi bi-chevron-right"
          style={{ color: "var(--c-sub)", fontSize: 13 }}
        />
      )}
    </div>
  );
}
