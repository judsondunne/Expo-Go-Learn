const timeAgo = (seconds) => {
  // Return 'Just now' if timestamp is not defined
  if (!seconds) {
    console.log("no timestamp provided");
    return "Just now";
  }

  const nowInSeconds = Math.floor(Date.now() / 1000); // Get the current time in seconds

  const diffInSeconds = nowInSeconds - seconds; // Difference in seconds

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else {
    return "Just now";
  }
};

export default timeAgo;
