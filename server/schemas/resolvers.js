const { User, Upload, Comment } = require("../models");
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
        const user = await User.findById(context.user._id)
          .populate("uploads")
          .populate("comments");

        return user;
      }
      throw AuthenticationError;
    },
    uploads: async () => {
      return Upload.find().populate("user").populate("comments");
      
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    //   addUpload: async () => {async (req, res) => {
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

    //   },
    addComment: async (parent, { uploadId, content }, context) => {
      if (context.user) {
        const comment = await Comment.create({
          content,
          user: context.user._id,
        });
        await Upload.findByIdAndUpdate(uploadId, {
          $push: { comments: comment._id },
        });
        return comment;
      }
      throw new AuthenticationError("Not logged in");
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    //   updateUpload: async () => {

    //   },
    updateComment: async (parent, { commentId, content }, context) => {
      if (context.user) {
        const comment = await Comment.findById(commentId);
        if (comment.user.toString() !== context.user._id) {
          throw new AuthenticationError("Not authorized");
        }
        return Comment.findByIdAndUpdate(commentId, { content }, { new: true });
      }
      throw new AuthenticationError("Not logged in");
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
  },
};

module.exports = resolvers;
