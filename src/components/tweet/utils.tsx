function formatSpecialText(text: string) {
  const regex = /(@\w+)|(#\w+)|(\$\w+)|(https?:\/\/[^\s]+)/g;

  const parts = [];
  let lastIndex = 0;

  text.replace(regex, (match, _, __, ___, ____, offset) => {
    if (lastIndex < offset) {
      parts.push(text.slice(lastIndex, offset));
    }

    <span
      key={offset}
      className="text-[#1d9bf0] hover:underline cursor-pointer"
    >
      {match}
    </span>;

    lastIndex = offset + match.length;
    return match;
  });

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${time} · ${dateStr}`;
};

export { formatDateTime, formatSpecialText };
