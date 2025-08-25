export const smartTruncate = ({
  text,
  limit = 50,
}: {
  text: string;
  limit?: number;
}): string => {
  if (text.length <= limit) {
    return text;
  }

  const truncated = text.slice(0, limit);
  const lastSpace = truncated.lastIndexOf(" ");

  if (lastSpace > limit * 0.7) {
    return truncated.slice(0, lastSpace) + "...";
  }

  return truncated + "...";
};

export const isValidUrl = (url: string) => {
  return (
    url.startsWith("https://youtu.be") ||
    url.startsWith("https://music.youtube.com")
  );
};
