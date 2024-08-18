/*
 "ticket": {
        "purchaser": "admin@admin.com",
        "purchase_datatime": "2024-08-17T23:22:44.705Z",
        "total_amount": 99,
        "code": "c4ocwfakp",
        "products": [
            {
                "product": {
                    "_id": "6672465017e3c285ee43ea43",
                    "title": "Product 2376",
                    "description": "Description for Product 2376",
                    "price": 99,
                    "thumbnail": [],
                    "code": "P2376",
                    "stock": 92,
                    "category": "clothing",
                    "status": true,
                    "__v": 0
                },
                "quantity": 1,
                "_id": "66c130cf7fe5f0c58263e774"
            }
        ],
        "_id": "66c130d57fe5f0c58263e77f",
        "__v": 0
    }
*/

export const respTicketDto = (ticket) => {
  return {
    title: product.title,
    description: product.description,
    price: product.price,
    stock: product.stock,
  };
};
