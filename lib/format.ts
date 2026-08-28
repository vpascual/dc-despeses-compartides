export function formatEur(amount: number): string {
  return (
    Math.abs(amount).toLocaleString("ca-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }) + " €"
  );
}

export function formatDayMonth(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString("ca-ES", {
    day: "numeric",
    month: "short",
  });
}

export function formatMonthYear(date: Date): string {
  const label = date.toLocaleDateString("ca-ES", {
    month: "long",
    year: "numeric",
  });
  return label.charAt(0).toUpperCase() + label.slice(1);
}
