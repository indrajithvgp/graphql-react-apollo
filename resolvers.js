exports.resolvers = {
    Query:{
        getAllRecipes:async(root, args, ctx, info)=>{
            const {Recipe} = ctx
            const allRecipes = await Recipe.find()
            return allRecipes
        }
    },
    Recipe:{

    },
    User:{

    },
    Mutation:{
        addRecipe: async(root, args, ctx, info)=>{
            const {name, description, category, instructions, username} = args
            const {Recipe, User} = ctx

            const newRecipe = await new Recipe({
                name: name,
                description: description,
                instructions,
                username: username,
                category
            })
            await newRecipe.save()

            return newRecipe
        }
    }

}