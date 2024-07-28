//extractor de cookies
export const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; //devuelvo el token de la cookie
  }
  return token;
};
