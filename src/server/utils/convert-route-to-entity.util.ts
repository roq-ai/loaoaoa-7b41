const mapping: Record<string, string> = {
  groups: 'group',
  memberships: 'membership',
  payments: 'payment',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
