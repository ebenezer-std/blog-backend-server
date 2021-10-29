const {ApolloServer, gql}= require('apollo-server');

const typeDefs = gql`

type Post{
    title: String!
    id: ID
    content: String!
    date: String
    author: Author
    comments: [Comment]
    likes: Int
    unlikes: Int


}

type Comment{
    name: String!
    content: String!

}

type Author{
    name: String!
    email: String!
    Hobbies: String
}

input PostInput{
    title: String!
    id: ID
    content: String!
    date: String
    author: String

}

type Query{
    posts: [Post!]!
    post(title: String): Post
    #post(author: String): Post
    #authors: [Author]!

     
}

type Mutation{
    createPost(input: PostInput!): Post!

}


`