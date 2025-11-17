export const phoneFormatting = (phone: string) => {
  if (phone.length > 8 && phone.includes("+")) {
    return phone.replace(/(\d{3})(\d{2})(\d{4})(\d+)/, "$1 $2 $3-$4");
  }

  return phone
    .replace(/^\+?\d{3}/, "")
    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
};
