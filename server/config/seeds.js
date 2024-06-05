const db = require("./connection");
const { User, Upload, Comment } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Upload", "uploads");
  await cleanDB("Comment", "comments");
  await cleanDB("User", "users");

  const comments = [
    {
      content: "This is my favorite video",
      createdAt: new Date(),
    },
    {
      content: "I have watched this video 20 times today!",
      createdAt: new Date(),
    },
    {
      content: "There is no better video on this site",
      createdAt: new Date(),
    },
  ];

  const commentDocs = await Comment.insertMany(comments);
  console.log("comments seeded", commentDocs);

  const users = await User.insertMany([
    {
      firstName: "Kenney",
      lastName: "Zhang",
      email: "kenny.zhang12138@gmail.com",
      password: "password12345",
      phoneNumber: "832 - 444 - 5555",
      comments: commentDocs.map((comment) => comment._id),
    //   uploads: uploads.map((upload) => upload._id),
    },
    {
      firstName: "Jake",
      lastName: "Howdeshell",
      email: "jakehowdy@gmail.com",
      password: "password12345",
      phoneNumber: "832 - 555 - 5555",
    },

    {
      firstName: "Chase ",
      lastName: "Ostien",
      email: "chase.ostien@gmail.com",
      password: "password12345",
      phoneNumber: "832 - 666 - 5555",
    },

    {
      firstName: "Richard",
      lastName: "Warden",
      email: "richard.warden@gmail.com",
      password: "password12345",
      phoneNumber: "832 - 777 - 5555",
    },
  ]);

  console.log("users seeded");

  const uploads = await Upload.insertMany([
    {
      title: "New Video",
      likes: 34,
      comments: commentDocs,
      createdAt: new Date(),
      description: "Check out my new video!",
      url: "to be filled in",
      size: 0,
      format: "jpeg",
      uploadDate: new Date(),
      user: users[0]._id,
    },
  ]);

  console.log("uploads seeded");

  await User.findByIdAndUpdate(users[0]._id, { uploads: uploads.map(upload => upload._id) });

  process.exit();
});
