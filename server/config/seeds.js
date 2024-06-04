const db = require("./connection");
const { User, Upload, Comment } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Upload", "uploads");
  await cleanDB("Comment", "comments");
  await cleanDB("User", "users");

  const comments = await Comment.insertMany([
    {
      content: "This is my favorite video",
      createdAt: new Date(),
      updatedAt: "",
    },
    {
      content: "I have watched this video 20 times today!",
      createdAt: new Date(),
      updatedAt: "",
    },
    {
      content: "There is no better video on this site",
      createdAt: new Date(),
      updatedAt: "",
    },
  ]);

  console.log("comments seeded");

  const uploads = await Upload.insertMany([
    {
      title: "New Video",
      likes: 34,
      comments: [comments[0]._id, comments[1]._id, comments[2]._id],
      createdAt: new Date(),
      description: "Check out my new video!",
      url: "to be filled in",
      size: 0,
      format: "jpeg",
      uploadDate: new Date(),
    },
  ]);

  console.log("uploads seeded");

  await User.create({
    firstName: "Kenney",
    lastName: "Zhang",
    email: "kenny.zhang12138@gmail.com",
    password: "password12345",
    phoneNumber: 832 - 444 - 5555,
    comments: comments.map(comment => comment._id),
    uploads: uploads.map(upload => upload._id),
  });

  await User.create({
    firstName: "Jake",
    lastName: "Howdeshell",
    email: "jakehowdy@gmail.com",
    password: "password12345",
    phoneNumber: 832 - 555 - 5555,
  });

  await User.create({
    firstName: "Chase ",
    lastName: "Ostien",
    email: "chase.ostien@gmail.com",
    password: "password12345",
    phoneNumber: 832 - 666 - 5555,
  });

  await User.create({
    firstName: "Richard",
    lastName: "Warden",
    email: "richard.warden@gmail.com",
    password: "password12345",
    phoneNumber: 832 - 777 - 5555,
  });

  console.log("users seeded");

  process.exit();
});
