export function getPlaceholder(field: string): string {
  const map: Record<string, string> = {
    name: "Enter your full name",
    email: "Enter your email address",
    youtube: "@your_youtube_handle",
    instagram: "@your_instagram_username",
    x: "@your_x_username (Twitter)",
  };
  return map[field] || "Enter value";
}
