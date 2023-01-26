import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import {setPosts} from "../../state"
import PostWidget from "./PostWidget";
// this widget is used to map all the posts that a user posted along the post of his friends
const PostsWidget=({userId,isProfile=false})=>{
    const dispatch=useDispatch(); // use redux
    const posts=useSelector((state)=>state.posts) // grab stored list of posts
    const token=useSelector((state)=>state.token);

    // we will do 2 api calls 
    // one for getting posts from all accounts on database
    // second for getting individual user post by clicking on its post

    //Api calls
    const getPosts=async()=>{
        const response=await fetch("http://localhost:3001/posts",{
        method: "GET",
        headers:{Authorization: `Bearer ${token}`}
        });
        const data= await response.json();
        dispatch(setPosts({posts:data}));
    };

    const getUserPosts=async()=>{
        const response=await fetch(`http://localhost:3001/posts/${userId}/posts`,{
        method: "GET",
        headers:{Authorization: `Bearer ${token}`}
        });
        const data= await response.json();
        dispatch(setPosts({posts:data}));
    };

    useEffect(()=>{
        if(isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    },[]);

    return (
        <>
            {posts.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    userPicturePath,
                    likes,
                    comments,
                })=>(
                    <PostWidget 
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                    />
                )
            )}
        </>
    )
}

export default PostsWidget;