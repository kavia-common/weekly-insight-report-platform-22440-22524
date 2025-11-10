export type Role = "EMPLOYEE" | "MANAGER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
}

export interface Session {
  user: User;
  expiresAt?: string;
  issuedAt?: string;
  // additional fields can be added as backend grows
}

/**
 * PUBLIC_INTERFACE
 * hasRole
 * Utility to check if a user has one of the allowed roles.
 */
export function hasRole(user: User | undefined, allowed: Role[]): boolean {
  if (!user) return false;
  return allowed.includes(user.role);
}
