"use server";

export async function createCompanion(values: any) {
  // In a real app we would call Vapi API and save it to a database
  // Here we'll return a mock companion with an ID
  const id = "mock-session-" + Math.random().toString(36).substring(7);
  return {
    id,
    ...values,
  };
}
