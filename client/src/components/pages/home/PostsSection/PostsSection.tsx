"use client";
import React, { useState } from "react";
import {
	GET_POSTS,
	ON_POST_CREATED,
	ON_POST_REMOVED,
	ON_POST_UPDATED,
} from "./operations";
import { useQuery, useSubscription } from "@apollo/client";
import { NoPosts, Post } from "@/components";
import { Post as IPost } from "@/types";

export const PostsSection: React.FC = () => {
	const [posts, setPosts] = useState<IPost[]>([]);
	useQuery(GET_POSTS, {
		onCompleted({ posts: queriedPosts }) {
			setPosts((p) => [...p, ...queriedPosts]);
		},
	});
	useSubscription(ON_POST_CREATED, {
		onData({ data: { data } }) {
			setPosts((p) => [data.postAdded, ...p]);
		},
	});
	useSubscription(ON_POST_UPDATED, {
		onData({ data: { data } }) {
			const updatedPost = data.postUpdated as IPost;
			setPosts((p) =>
				p.map((post) => (post.id === updatedPost.id ? updatedPost : post))
			);
		},
	});
	useSubscription(ON_POST_REMOVED, {
		onData({ data: { data } }) {
			setPosts((p) => p.filter((post) => post.id !== data.postRemoved));
		},
	});
	return (
		<>
			{posts.length == 0 && <NoPosts />}
			<ul className="Posts flex flex-col gap-4">
				{posts.map((post: IPost) => (
					<Post key={post.id} {...post} />
				))}
			</ul>
		</>
	);
};
