export function buildName({
  first_name,
  last_name,
}: {
  first_name?: string;
  last_name?: string;
  [x: string]: any;
}) {
  return [first_name, last_name].join(" ");
}
