const db = require("./connection");
const { User, Upload, Comment } = require("../models");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  await cleanDB("Upload", "uploads");
  await cleanDB("Comment", "comments");
  await cleanDB("User", "users");

  const uploads = await Upload.insertMany([
    {
      title: "New Video",
      likes: 34,
      comments: [
        {
          comments: [comments[3]._id, comments[7]._id],
        },
      ],
      createdAt: "September 15th 9:15",
      description: "Check out my new video!",
      url: "to be filled in",
      size: 0,
      format: "jpeg",
      uploadDate: "September 15th 9:15",
      user: User.firstname + User.lastName,
    },
  ]);

  console.log("uploads seeded");

  const comments = await Comment.insertMany([
    {
      content: "This is my favorite video",
      user: User.firstname + User.lastName,
      createdAt: "September 17th 5:15",
      updatedAt: "",
    },
    {
      content: "I have watched this video 20 times today!",
      user: User.firstname + User.lastName,
      createdAt: "October 1st 6:15",
      updatedAt: "",
    },
    {
      content: "There is no better video on this site",
      user: User.firstname + User.lastName,
      createdAt: "November 14th 1:15",
      updatedAt: "",
    },
  ]);

  console.log("comments seeded");

  await User.create({
    firstName: "Kenney",
    lastName: "Zhang",
    email: "kenny.zhang12138@gmail.com",
    password: "password12345",
    phoneNumber: 832 - 444 - 5555,
    comments: [
      {
        comments: [comments[0]._id, comments[1]._id, comments[2]._id],
      },
    ],
    uploads: [
      {
        uploads: [uploads[0]._id],
      },
    ],
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
