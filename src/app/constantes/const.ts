export const TOKEN_ERRORS = {
    TOKEN_NOT_FOUND:"TOKEN_NOT_FOUND",
    TOKEN_EMPTY:'TOKEN_EMPTY',
    TOKEN_EXPIRED:"TOKEN_EXPIRED",
    TOKEN_ERR:"TOKEN_ERR",
    TOKEN_INVALID:"TOKEN_INVALID"
  }

export const menuItems = {
    conversor:   {
      label: 'Conversor',
      route: 'conversion',
      icon: 'document_scanner'
    },
    historial:   {
      label: 'Historial',
      route: 'historial',
      icon: 'list'
    },
    cerrar:   {
      label: 'Cerrar Sesión',
      route: 'logout',
      icon: 'logout'
    }
}
export const admin = [
  menuItems.conversor ,
  menuItems.historial,
];

export const user = [
  menuItems.conversor ,
];

