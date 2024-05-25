const typeDefs = `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        password: String
        uploads: [Upload]
        comments: [Comment]
      }

      type Auth {
        token: ID
        user: User
      }

      type Upload {
        _id: ID
        title: String
        description: String
        url: String
        size: String
        format: String
        uploadDate: String
        uploader: String
        comments: [Comment]
      }
      type Comment {
        _id: ID
        content: String
        user: User
        createdAt: String
        updatedAt: String
      }
      type Query {
        user: User
        uploads: [Upload]

      }
    
      type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, password: String!): Auth
        addUpload(title: String!, description: String!, url: String!, size: String!, format: String!): Upload
        addComment(uploadId: ID!, content: String!): Comment
        updateUser(firstName: String, lastName: String, email: String, phoneNumber: String, password: String): User
        updateUpload(uploadId: ID!, title: String, description: String, url: String, size: String, format: String): Upload
        updateComment(commentId: ID!, content: String): Comment
        login(email: String!, password: String!): Auth
      }
  `;

module.exports = typeDefs;
