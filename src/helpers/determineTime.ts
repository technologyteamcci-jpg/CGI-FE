import { DateTime } from "luxon";
export const determineTime = () => {
  const currentTime = new Date().getHours();

  let timeOfDay = "afternoon";
  let icon = "\uD83C\uDF24"; // 🌤 (Sun Behind Small Cloud)

  if (currentTime < 12) {
    timeOfDay = "morning";
    icon = "☀️";
  } else if (currentTime >= 17) {
    timeOfDay = "evening";
    icon = "\uD83C\uDF19"; // 🌙 (Crescent Moon)
  }

  return { timeOfDay, icon };
};

export const isBirthday = (employee: any) => {
  if (!employee.birthday) return false;
  const birthDate = DateTime.fromISO(employee.birthday).startOf("day"); // Ensure it's an ISO string format (YYYY-MM-DD)
  const today = DateTime.now();

  const isToday =
    birthDate.month === today.month && birthDate.day === today.day;
  return isToday;
};
