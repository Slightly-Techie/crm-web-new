"use client";
import React from "react";
import UserPost from "./user_post";
// import { useFetchFeeds } from "./FeedServices";
import Spinner from "@/components/spinner";

export const FeedPosts = [
  {
    id: "1",
    title: "Post 1",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, quas.",
    user: {
      id: 1,
      first_name: "Addod",
      last_name: "Addod",
      profile_pic_url: "",
      username: "addiand",
    },
  },
  {
    id: "2",
    title: "Post 2",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, quas.",
    user: {
      id: 1,
      first_name: "Addod",
      last_name: "Addod",
      profile_pic_url: "",
      username: "addiand",
    },
  },
  {
    id: "3",
    title: "Post 3",
    content:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem, quas.",
    user: {
      id: 1,
      first_name: "Addod",
      last_name: "Addod",
      profile_pic_url: "",
      username: "addiand",
    },
  },
];

function Posts() {
  //   const { isFetching, isFetchingError, FeedPosts } = useFetchFeeds();
  const isFetching = false;

  return (
    <>
      <div className="h-full w-full flex-col">
        {isFetching && (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <Spinner />
          </div>
        )}
        {/* {isFetchingError && (
          <h1 className="h-full w-full flex flex-col items-center justify-center">
            There is an error fetching posts
          </h1>
        )} */}
        {FeedPosts &&
          FeedPosts.map((data) => <UserPost key={data.id} post={data} />)}
      </div>
    </>
  );
}

export default Posts;
