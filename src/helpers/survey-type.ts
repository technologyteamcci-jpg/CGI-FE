import {
  SurveyData,
  SurveyReportType,
  SurveyStatus,
} from "@/interfaces/surveys";

export const generateSurveyCategory = function (
  surveyType: SurveyData["type"],
): SurveyReportType {
  switch (surveyType) {
    case SurveyReportType.GENERAL:
      return SurveyReportType.GENERAL; // ✅ Return correct enum type

    default:
      return SurveyReportType.GENERAL; // ✅ Fallback case should also return enum type
  }
};

export const generateSurveyStatus = function (cat: SurveyStatus) {
  switch (cat) {
    case SurveyStatus.PENDING:
      return "pending";

    case SurveyStatus.SENT:
      return "sent";

    case SurveyStatus.SUBMITTED:
      return "submitted";

    default:
      return "pending";
  }
};
