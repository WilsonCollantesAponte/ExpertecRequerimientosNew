export function Validations(data) {
  // const regExEmail = new RegExp(/^[^@]+@[^@]+\.[a-zA-Z]{2,}$/);

  //   const regExPassword = new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)

  let errors = {};

  // if (!regExEmail.test(data.email))
  // errors.email =
  //   "Escriba un texto con formato email.\n Ejemplo: \n 'foo-bar.baz@example.com'";

  if (data.email.length < 5)
    errors.email =
      "Escriba un texto con formato email.\n Ejemplo: \n 'foo-bar.baz@example.com'";

  //   if (!regExPassword.test(data.password))
  if (data.password.length < 5)
    errors.password = "La contraseña debe tener al mínimo 5 caracteres";

  return errors;
}
