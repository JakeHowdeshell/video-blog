const typeDefs =  `
type Query {
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        password: String
        orders: [Order]
      }

      type Upload {
        title: String
        description: String
        url: String
        size: Number
        format: String
        uploadDate: Date
        uploader: String
      }
      type Query {
        user: User
        uploads: [Uploads]

      }
    
      type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, password: String!): Auth
        addUpload
        updateUser(firstName: String, lastName: String, email: String, phoneNumber: String, password: String): User
        updateUpload
        login(email: String!, password: String!): Auth
      }
  }`;

module.exports = typeDefs;