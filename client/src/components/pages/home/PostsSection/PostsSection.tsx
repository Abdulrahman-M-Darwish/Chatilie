"use client";
import React, { useState } from "react";
import {
	GET_POSTS,
	ON_POST_CREATED,
	ON_POST_REMOVED,
	ON_POST_UPDATED,
} from "./operations";
import {
	DocumentNode,
	OperationVariables,
	useQuery,
	useSubscription,
} from "@apollo/client";
import { NoPosts, Post } from "@/components";
import { Post as IPost } from "@/types";
import { usePostSubscriptions } from "@/hooks";

type Props = {
	query?: DocumentNode;
	variables?: OperationVariables;
};

export const PostsSection: React.FC<Props> = ({ query, variables }) => {
	const [posts, setPosts] = useState<IPost[]>([]);
	useQuery(query || GET_POSTS, {
		variables,
		onCompleted({ posts: queriedPosts }) {
			setPosts((p) => [...p, ...queriedPosts]);
		},
	});
	usePostSubscriptions({ setPosts });
	return posts.length == 0 ? (
		<NoPosts />
	) : (
		<ul className="Posts flex flex-col gap-4">
			{posts.map((post) => (
				<Post key={post.id} {...post} />
			))}
		</ul>
	);
};
