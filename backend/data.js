import bcrypt from 'bcryptjs';
export default {

    users: [
        {
          name: 'Chopper',
          email: 'admin@example.com',
          password: bcrypt.hashSync('123456', 8),
          isAdmin: true,
          },
        {
          name: 'John',
          email: 'user@example.com',
          password: bcrypt.hashSync('123456', 8),
          isAdmin: false,
        },
      ],
    products:[
        {
        name: 'Slim Shirt',
        category: 'Shirts',
        image:'/images/img1.jpg',
        brand: 'Nike',
        description: 'high quality product',
    },
    {
        name: 'Slim Shirt',
        category: 'Shirts',
        image:'/images/img1.jpg',
        brand: 'Nike',
        description: 'high quality product',
    },
    {
        name: 'Slim Shirt',
        category: 'Shirts',
        image:'/images/img1.jpg',
        brand: 'Nike',
        description: 'high quality product',
    },
    {
        name: 'Slim Shirt',
        category: 'Shirts',
        image:'/images/img1.jpg',
        brand: 'Nike',
        description: 'high quality product',
    },
    

]

}