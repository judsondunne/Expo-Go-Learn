function encodeFilename(url) {
  return url.replace("/images/", "/images%2f");
}

export default encodeFilename;
