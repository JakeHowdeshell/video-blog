const typeDefs =  `
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        phoneNumber: String
        password: String
        uploads: [Upload]
      }

      type Auth {
        token: ID
        user: User
      }

      type Upload {
        title: String
        description: String
        url: String
        size: String
        format: String
        uploadDate: String
        uploader: String
      }
      type Query {
        user: User
        uploads: [Upload]

      }
    
      type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, phoneNumber: String!, password: String!): Auth
        updateUser(firstName: String, lastName: String, email: String, phoneNumber: String, password: String): User
        login(email: String!, password: String!): Auth
      }
  `;

module.exports = typeDefs;