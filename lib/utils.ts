export const sanitizeEmail = (email: string): string => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};
