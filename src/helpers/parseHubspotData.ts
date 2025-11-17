import { KanbanProperties } from "@/interfaces/crm";

export function parseHubspotCandidate(hubspotObj: any): KanbanProperties {
  if (!hubspotObj) {
    console.warn("parseHubspotCandidate called with undefined hubspotObj");
    return {} as KanbanProperties;
  }

  // Ensure we always have a property bag
  const p: Record<string, any> =
    hubspotObj.properties && typeof hubspotObj.properties === "object"
      ? hubspotObj.properties
      : hubspotObj.stage && hubspotObj.properties // maybe already in Kanban shape
        ? hubspotObj.properties
        : {};

  let country = p.country || p.residing_country || "";

  // --- languages ---
  const languages: string[] = [];
  if (typeof p.language_spoken === "string") {
    const lower = p.language_spoken.toLowerCase();
    if (lower.includes("english")) languages.push("English");
    if (lower.includes("spanish")) languages.push("Spanish");
  }

  // --- name cleanup ---
  const rawName = p.virtual_staff_name || hubspotObj.name || "";
  const name =
    rawName.replace(/(HHH|ENT|B|R|BV\/MV)\s?-?\s?/g, "").trim() || "Unknown";

  // --- skills ---
  const rawSkills =
    typeof p.career_highlights___relevant_job_experiences === "string"
      ? p.career_highlights___relevant_job_experiences
          .split(";")
          .map((s) => s.trim())
      : [];
  const skills: string[] = rawSkills.filter(
    (s) => !/^US Law Firm Experience/i.test(s) && !/^bpo - others/i.test(s),
  );

  // --- tools ---
  const usedToolsArray =
    typeof p.tools_used === "string"
      ? p.tools_used.split(";").map((t) => t.trim())
      : [];

  // --- roles ---
  const roles: string[] = [];
  const addRole = (r?: string) => {
    if (!r) return;
    let role = r.trim();
    if (role.toLowerCase() === "bookkeeping va") role = "Bookkeeper";
    roles.push(...role.split(";"));
  };
  addRole(p.position_recommended);
  addRole(p.agreed_va_role_v2);

  const enterprise = /^ENT/i.test(p.virtual_staff_name || "");
  const ratePerHour = Number(p.agreed_hourly_rate) || 0;

  return {
    ...hubspotObj,
    properties: {
      firstName: p.first_name || "",
      lastName: p.last_name || "",
      name,
      gender:
        (p.gender?.toLowerCase() as "male" | "female" | "other") || "other",
      dateApplied: p.hs_createdate || "",
      interviewDate: p.interview_date || "",
      email: p.email || "",
      phone: p.phone || "",
      originCountry: country,
      residenceCountry: p.residing_country || "",
      resumeUrl: p.resume_jazz_hr || "",
      headshotUrl: p.headshot_screenshot || "",
      sparkHireVideoUrl: p.sparkhire_video || "",
      languages,
      careerHighlights: skills,
      tools: usedToolsArray,
      roles,
      enterprise,
      usLawPracticeArea: p.law_practice_v2
        ? p.law_practice_v2.split(";").map((x: string) => x.trim())
        : [],
      // ... other fields as before ...
      agreedHourlyRate: ratePerHour,
      positionRecommended: p.position_recommended || "",
    },
  };
}
