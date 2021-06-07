exports.typeDefs = `

type Query{
    getAllRecipes: Recipe!
    getCurrentUser: User!
}

type Recipe{
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdAt: String!
    likes: Int
    username: String
}

type User{
    username: String! @unique
    password: String! 
    email: String!
    joinDate: String
    favorites: [Recipe]
}

type Token{
    token: String!
}

type Mutation{
    addRecipe(name: String!, 
    description: String!, 
    category: String!, instructions: String!, username: String): Recipe
    signUpUser(username: String!, email: String!, password: String!): Token
}

`