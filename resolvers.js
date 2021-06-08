const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const createToken = async(user, secret, expiresIn)=>{
    const {username, email} = user
    return await jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query:{
        getAllRecipes:async(root, args, ctx, info)=>{
            const {Recipe} = ctx
            const allRecipes = await Recipe.find().sort({
                createdAt: -1
            })
            return allRecipes
        },
        getCurrentUser: async(root, args, {currentUser, User}, info)=>{

            if(!currentUser){
                return null
            }

            const user = await User.findOne({username: currentUser.username})
                .populate({
                    path: 'favorites',
                    model: 'Recipe'
                })
            return user
        },
        getRecipe: async(root, {_id}, {Recipe}) => {
            const recipe = await Recipe.findOne({_id})
            return recipe
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
        },
        signInUser:async(root, {username, password}, {User}, info)=>{
            const user = await User.findOne({username})
            if(!user){
                throw new Error('User not found')
            }
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!isValidPassword){
                throw new Error('Invalid Password')
            }

            return {token: createToken(user, process.env.SECRET, '1hr')}
        },
        signUpUser: async(root, {username, email, password}, {User}, info)=>{
            const user = await User.findOne({username: username}) 
            if(user){
                throw new Error('User Alreday Exists')
            }

            const newUser = await new User({
                username, email, password
            }).save()

            return {
                token: createToken(newUser, process.env.SECRET , '1hr')
            }
        }
    }
}