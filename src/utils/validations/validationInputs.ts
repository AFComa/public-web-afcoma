export const isValidEmail = (val: string): boolean | string => {
  const emailPattern =
    /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val) || 'El correo no parece ser válido';
};
export const isPassword = (val: string): boolean | string => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
  // /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&.])[A-Za-z\d@$!%*#?&.]{8,}$/;
  return (
    passwordRegex.test(val) ||
    'La contraseña debe contener 8 characteres, letras, números y carácter especial.'
  );
};
/**
 * Permite solo números en un campo de entrada.
 * @param event - El evento de teclado.
 */
export const onlyNumeric = (event: KeyboardEvent) => {
  const char = String.fromCharCode(event.which);
  if (!/^[0-9]$/.test(char)) {
    event.preventDefault();
  }
};

/**
 * Permite solo letras en un campo de entrada.
 * @param event - El evento de teclado.
 */
export const onlyAlphabetic = (event: KeyboardEvent) => {
  const char = String.fromCharCode(event.which);
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]$/.test(char)) {
    event.preventDefault();
  }
};
