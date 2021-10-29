const {ApolloServer, gql}= require('apollo-server');


const resolvers = {
    Query:{
        posts:(root)=>{
            return new Promise((res,rej)=>{
            Blog.find((err, blogs)=>{
                if(err) rej(err);
                else res(blogs)
            })    
            })

            
        },
        post:(root,{title}) =>{
            return new Promise((res,rej)=> {
                Blog.findOne({title:title},(err,posttitle)=>{
                    if (err) rej(err);
                    else res(posttitle);
                })
            })

        },
         post:(root,{author}) =>{
            return new Promise((res,rej)=> {
                Blog.findOne({title:title},(err,posttitle)=>{
                    if (err) rej(err);
                    else res(posttitle);
                })
            })

        }
    },
    Mutation:{
        createPost:(root, {input}) => {
            const newPost = new Blog({
                title: input.title,
                IDNo: input.id,
                authorName: input.author,
                content:input.content ,
                date:new Date(),
                likes: 17,
                unlikes:3
            

            })

            return new Promise((res,rej) =>{
                newPost.save((err)=>{
                    err? rej(err): res(newPost)
                })
            })
        }
    }
}

module.exports= resolvers;
