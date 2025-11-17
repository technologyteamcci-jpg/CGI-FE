export function stripHtmlTags(inputString: string) {
  return inputString.replace(/<[^>]*>/g, "");
}
