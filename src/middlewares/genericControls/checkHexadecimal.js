export default function isHexadecimal24Chars(string) {
  // Verifica que la cadena tenga exactamente 24 caracteres
  if (string.length !== 24) {
    return false;
  }
  // Verifica que todos los caracteres sean dígitos hexadecimales (0-9, a-f, A-F)
  const patternHexadecimal = /^[0-9a-fA-F]+$/;
  return patternHexadecimal.test(string);
}
