const graphql = require('graphql')
const {
    GraphQLObjectType, 
    GraphQLString,GraphQLID, 
    GraphQLBoolean,
    GraphQLList,
    GraphQLSchema,
    GraphQLNonNull
} = graphql

const Users = require('./userSchema')
const Posts = require('./postSchema')
const Messages = require('./messageSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ObjectId = require('mongoose').Types.ObjectId;


ObjectId.prototype.valueOf = function () {
	return this.toString();
};

const userType = new GraphQLObjectType({
    name: 'User',
    fields: () =>({
        id: {type: GraphQLID },
        firstname: {type: GraphQLString },
        lastname: {type: GraphQLString},
        email: { type: GraphQLString},
        username: { type: GraphQLString},
        messages: { type: new GraphQLList(messageType) },
        posts: { type:  new GraphQLList(postType)},
        token: { 
            type: tokenType,
            resolve(parent, args){
                console.log(parent)
               return parent
            }
         }
    })
})

const tokenType = new GraphQLObjectType({
    name: 'Token',
    fields: {
        token: {type: GraphQLString }
    }
})

const postType = new GraphQLObjectType({
    name: 'Post',
    fields: () =>({
        _id: { type: GraphQLID },
        user: { type: userType },
        title: {type: GraphQLString },
        date: { type: GraphQLString},
        content: { type: GraphQLString},
    })
})


const messageType = new GraphQLObjectType({
    name: 'Message',
    fields: () =>({
        _id: { type: GraphQLID },
        from: { type: GraphQLID },
        to: { type: GraphQLID },
        subject: { type: GraphQLString},
        message: { type: GraphQLString},
        sent_date: { type: GraphQLString},
        read: { type: GraphQLBoolean},
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: userType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return Users.findById({_id: args.id})
            }
        },
        users: {
            type: new GraphQLList(userType),
            resolve(parent, args, context){
               return Users.find({})
            }
        },
    }
})


const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields:{
        createToken: {
            type: userType,
            args: {
                email: {type: new GraphQLNonNull(GraphQLString)},
                password: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve: (parent, args, context) => {
             return Users.findOne({email: args.email})
                .then(function(data){
                    if(data !== null){
                        return jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            user: data
                            }, process.env.SECRET)
                        }else{
                        throw new Error('Invalid credentials')
                    }
                })
            }
        },
        createUser: {
            type: userType,
            args: {
                firstname: {type: GraphQLString },
                lastname: {type:GraphQLString},
                email: { type: new GraphQLNonNull(GraphQLString)},
                username: { type: new GraphQLNonNull(GraphQLString)},
                password: { type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent, args){
                let user = {
                    firstname: args.firstname,
                    lastname: args.lastname,
                    email: args.email,
                    username: args.username,
                    password: bcrypt.hashSync(args.password, 10),
                }
               return Users.create(user)
            }
        },
        submitPost:{
            type: postType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                date: {type: GraphQLString},
                user: {type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let post_date = new Date()
                let post = {
                    title: args.title,
                    content: args.content,
                    date: post_date.toLocaleString('de-DE'),
                    user: args.user
                }
                return Posts.create(post)
                .then(function(data){
                   return Users.findByIdAndUpdate(data.user, {$push: {posts: data}})
                })
            }
        },
        sendMessage: {
            type: messageType,
            args: {
                from: { type:new GraphQLNonNull(GraphQLID)},
                to: { type: new GraphQLNonNull(GraphQLID)},
                subject: { type: new GraphQLNonNull(GraphQLString)},
                message: { type: new GraphQLNonNull(GraphQLString)},
                sent_date: { type: GraphQLString}
            },
            resolve(parent, args){
                let message_date = new Date()
                let message = {
                    from: args.from,
                    to: args.to,
                    subject: args.subject,
                    message: args.message,
                    sent_date: message_date.toLocaleString('de-DE')
                }
                return Messages.create(message)
                .then(function(data){
                   return Users.findByIdAndUpdate(data.from, {$push: {messages: data}})
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})