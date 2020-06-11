import Routes from './Routes.json';

export function canAccessDashboard(userObject, roles) {
  return (roles.indexOf('Admin') === -1 && roles.indexOf('SuperAdmin') === -1)
}

export function loginRedirection(userObject, roles) {
  if (canAccessDashboard(userObject, roles)) return Routes.AdminPanel + Routes.Dashboard;
  return Routes.AdminPanel;
}
