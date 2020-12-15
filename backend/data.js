import bcrypt from 'bcryptjs';
export default {

    users: [
        // {
        //   name: 'Chopper',
        //   email: 'admin@example.com',
        //   password: bcrypt.hashSync('123456', 8),
        //   isAdmin: true,
        //   },
        // {
        //   name: 'Chopper',
        //   email: 'user@example.com',
        //   password: bcrypt.hashSync('123456', 8),
        //   isAdmin: false,
        // },
        {
          name: 'Chopper',
          email: 'vanspykid85@gmail.com',
          password: bcrypt.hashSync('123456', 8),
          isAdmin: true,
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