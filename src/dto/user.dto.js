/*
{
    "status": "ok",
    "payload": {
        "_id": "66a5aa206f9d5e24b6cf898c",
        "first_name": "elpassEs12345",
        "last_name": "APEPRUEBA",
        "password": "$2b$10$QzBhjozoQIcsyrqU8rjOt.iFIOYmGFXIRqxARZdKibI6SogRbzx6.",
        "email": "prueba@prueba.com",
        "age": 20,
        "role": "user",
        "cart": {
            "_id": "66a5aa206f9d5e24b6cf898a",
            "products": [],
            "__v": 0
        },
        "__v": 0
    }
}*/

export const respUserDto = (user) => {
  console.log(user);
  return {
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role,
    // cart_id: user.cart._id,
  };
};
