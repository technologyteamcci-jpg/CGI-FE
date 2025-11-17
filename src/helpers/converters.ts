import { KanbanProperties } from "@/interfaces/crm";

export const mapHubspotFieldsToKanbanProperties = (
  input: Record<string, any>,
): KanbanProperties => {
  const fromMidnightUTC = (isoStr?: string | null) => {
    if (!isoStr) return undefined;
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString();
  };

  const splitSemicolon = (str?: string | null): string[] => {
    if (!str) return [];
    return str.split(";").filter((s) => s.trim().length > 0);
  };

  const toBoolean = (str?: string | null): boolean | undefined => {
    if (!str) return undefined;
    return str.toLowerCase() === "yes" || str.toLowerCase() === "true";
  };

  const toNumber = (str?: string | null): number | undefined => {
    if (!str) return undefined;
    const num = Number(str);
    return isNaN(num) ? undefined : num;
  };

  return {
    agreedHourlyRate: input.agreed_hourly_rate || 0,
    positionRecommended:
      input.position_recommended || input.agreed_va_role_v2 || undefined,
    originCountry: input.origin_country || input.country || undefined,
    residenceCountry: input.residing_country || undefined,
    dateApplied: fromMidnightUTC(input.date_applied) ?? "",
    email: input.email || undefined,
    employmentType: input.employment_type || undefined,
    firstName: input.first_name || undefined,
    lastName: input.last_name || undefined,
    name:
      input.virtual_staff_name ||
      `${input.first_name || ""} ${input.last_name || ""}`.trim() ||
      undefined,
    gender: input.gender || undefined,
    interviewDate: fromMidnightUTC(input.interview_date) ?? "",
    interviewedBy: input.interviewer || undefined,
    resumeUrl: input.resume_jazz_hr || undefined,
    languages: splitSemicolon(input.language_spoken),
    usLawPracticeArea: splitSemicolon(input.law_practice_v2),
    localLawPracticeArea: splitSemicolon(input.local_practice_law),
    sparkHireVideoUrl:
      input.sparkhire_video || input.video_jazz_hr || undefined,
    phone: input.mobile_phone_number || undefined,
    workShift: input.work_shift_ || undefined,
    finalRecommendation: input.final_recommendation || undefined,
    computerSpecifications: input.computer_specifications_ || undefined,
    backgroundNoise: input.background_noise_ || undefined,
    workChangeReason: input.reason_for_leaving_ || undefined,
    signOnBonusEligibility: input.sign_on_bonus_eligibility || undefined,
    source: input.source_ || undefined,
    careerHighlights: splitSemicolon(
      input.career_highlights___relevant_job_experiences,
    ),
    sourcedBy: input.sourcing_specialist || undefined,
    timezones: splitSemicolon(input.time_zone),
    headshotUrl: input.headshot_screenshot || undefined,
    agreeAfterHoursAndNightShift: toBoolean(
      input.are_you_open_and_willing_to_work_an_after_hours_or_night_shift_schedule_,
    )
      ? "Yes"
      : "No",
    availableWeekends: toBoolean(
      input.would_you_be_available_to_work_on_the_weekends_if_needed_,
    )
      ? "Yes"
      : "No",
    interviewQuestions: input.enhanced_interview_questions || undefined,
    yearsUsLawPractice: toNumber(input.years_of_us_law_firm_experience),
    workAvailableTimeBlocks: splitSemicolon(
      input.work_availability_time_blocks,
    ),
    noticeDuration: input.notice_duration || undefined,
    tools: splitSemicolon(input.tools_used),
    agreeUpdatedForm:
      input.agree_to_submit_updated_interview_form === "true" ? "Yes" : "No",
    agreeProfileOtherRoles: toBoolean(
      input.did_candidate_agreed_to_be_profiled_for_another_role_,
    )
      ? "Yes"
      : "No",
    hubstaffUsage: input.hubstaff_usage === "Agree" ? "Yes" : "No",
    comments: input.comments_,
  };
};
