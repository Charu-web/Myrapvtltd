export type UserRole = 'ADMIN' | 'SALES_AGENT' | 'OPERATIONS' | 'FINANCE' | 'HR' | 'PARTNER' | 'BANKER';

export interface PermissionCheck {
  canAccessAllLeads?: boolean;
  canAccessCommissions?: boolean;
  canAccessHR?: boolean;
  canAccessBankerSchemes?: boolean;
  canAccessPartnerPortal?: boolean;
  canAccessAccounting?: boolean;
  canAccessSettings?: boolean;
}

export function getRolePermissions(role: string): PermissionCheck {
  switch (role) {
    case 'ADMIN':
      return {
        canAccessAllLeads: true,
        canAccessCommissions: true,
        canAccessHR: true,
        canAccessBankerSchemes: true,
        canAccessPartnerPortal: true,
        canAccessAccounting: true,
        canAccessSettings: true,
      };
    case 'SALES_AGENT':
      return {
        canAccessAllLeads: false,
        canAccessCommissions: false,
        canAccessHR: false,
        canAccessBankerSchemes: false,
        canAccessPartnerPortal: false,
        canAccessAccounting: false,
        canAccessSettings: false,
      };
    case 'OPERATIONS':
      return {
        canAccessAllLeads: true,
        canAccessCommissions: false,
        canAccessHR: false,
        canAccessBankerSchemes: true,
        canAccessPartnerPortal: false,
        canAccessAccounting: false,
        canAccessSettings: false,
      };
    case 'FINANCE':
      return {
        canAccessAllLeads: true,
        canAccessCommissions: true,
        canAccessHR: false,
        canAccessBankerSchemes: false,
        canAccessPartnerPortal: true,
        canAccessAccounting: true,
        canAccessSettings: false,
      };
    case 'HR':
      return {
        canAccessAllLeads: false,
        canAccessCommissions: false,
        canAccessHR: true,
        canAccessBankerSchemes: false,
        canAccessPartnerPortal: false,
        canAccessAccounting: false,
        canAccessSettings: false,
      };
    case 'PARTNER':
      return {
        canAccessAllLeads: false,
        canAccessCommissions: true,
        canAccessHR: false,
        canAccessBankerSchemes: false,
        canAccessPartnerPortal: true,
        canAccessAccounting: false,
        canAccessSettings: false,
      };
    case 'BANKER':
      return {
        canAccessAllLeads: false,
        canAccessCommissions: false,
        canAccessHR: false,
        canAccessBankerSchemes: true,
        canAccessPartnerPortal: false,
        canAccessAccounting: false,
        canAccessSettings: false,
      };
    default:
      return {};
  }
}
