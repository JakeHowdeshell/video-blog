const { User, Upload } = require('../models');
const { signToken, AuthenticationError } = require("../utils/auth");
const multer = require("multer");
// =========== Multer Middlewear ===========
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const video = multer({
  storage: storage,
}).single("mypic");

const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id).populate({
                // path: "orders.meals",
                // populate: "category",
              });
            //   user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
      
              return user;
            }
            throw AuthenticationError;
          },
        //   upload: async () => {async (req, res) => {
//   video(req, res, async (err) => {
//     console.log(req.body.mypic);
//     try {
//       const { product_name, price, url, stock, category_id } = req.body;

//       if (!product_name) {
//         return res.status(400).json({ error: "Product name is required" });
//       }

//       const newProduct = await Product.create({
//         product_name,
//         price,
//         url,
//         stock,
//         category_id,
//       });
//       res.status(201).json(newProduct);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json(err);
//     }
//     if (err instanceof multer.MulterError) {
//       console.error(err);
//     } else if (err) {
//       console.error(err);
//     }
//   });

        //   }
      },
      Mutation: {
        addUser: async (parent, args) => {
          const user = await User.create(args);
          const token = signToken(user);
    
          return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, {
                new: true,
              });
            }
      
            throw AuthenticationError;
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
    }
};

module.exports = resolvers;