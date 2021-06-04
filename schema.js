exports.typeDefs = `

type Query{
    getAllRecipes: Recipe!
    user: User!
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

type Mutation{
    addRecipe(name: String!, 
    description: String!, 
    category: String!, instructions: String!, username: String): Recipe
}

`