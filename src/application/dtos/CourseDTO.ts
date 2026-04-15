export interface CreateCourseDTO {
  id: number;
  name: string;
  requiredCredits: number;
  transferredCredits: number;
  electiveCredits: number;
  complementaryCredits: number;
  numberOfComplementaryTypes: number;
  extensionHours: number;
}
