export {}

// Create a type for the Roles
export type Roles = 'admin' | 'student'

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles
    }
  }
}