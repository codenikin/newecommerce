import type { User } from '@/payload-types'

type Role = NonNullable<User['roles']>[number]
type RoleInput = Role | Role[]

const toRoleArray = (roles: RoleInput): Role[] => {
  return Array.isArray(roles) ? roles : [roles]
}

export const checkRole = (allRoles: RoleInput = [], user?: User | null): boolean => {
  if (!user) return false

  const userRoles = user.roles ?? []
  const rolesToCheck = toRoleArray(allRoles)

  return rolesToCheck.some((role) => {
    return userRoles.includes(role)
  })
}
