// Function to get initials from full name
export const getInitials = (name?: string | null): string => {
  // Handling null, undefined, or non-string inputs
  if (!name || typeof name !== "string") return "U";

  const trimmed = name.trim();
  if (!trimmed) return "U";

  const nameParts = trimmed.split(" ").filter((part) => part.length > 0);
  if (nameParts.length === 0) return "U";
  if (nameParts.length === 1) return nameParts[0][0].toUpperCase();

  const firstInitial = nameParts[0][0].toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1][0].toUpperCase();

  return `${firstInitial}${lastInitial}`;
};

export function currencyFormatter(amount?: number | string | null): string {
  // Handle null, undefined, NaN, or invalid input
  if (
    amount === null ||
    amount === undefined ||
    amount === "" ||
    isNaN(Number(amount))
  ) {
    return "₦0.00";
  }

  // Convert to number
  const numericAmount = Number(amount);

  // Use Intl.NumberFormat for proper currency formatting
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

export function formatCurrency(amount?: number | string | null): string {
  // Handle null, undefined, NaN, or invalid input
  if (
    amount === null ||
    amount === undefined ||
    amount === "" ||
    isNaN(Number(amount))
  ) {
    return "£0.00";
  }

  // Convert to number
  const numericAmount = Number(amount);

  // Use Intl.NumberFormat for proper currency formatting
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericAmount);
}

export const maskedEmail = (email: string) =>
  email ? email.replace(/(.{2}).+(@.+)/, "$1•••$2") : "your email";
