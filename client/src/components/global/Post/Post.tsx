"use client";
import React from "react";
import { Post as IPost } from "@/types";
import dynamic from "next/dynamic";
import { useAppSelector } from "@/store";
import { PostHead } from "./PostHead";
import { PostBody } from "./PostBody";
import { PostInteractions } from "./PostInteractions";
import { PostRePostBody } from "./PostRePostBody";
import Image from "next/image";

const PostEditor = dynamic(() =>
	import("@/components").then((mod) => mod.PostCreator)
);

export const Post: React.FC<IPost> = (post) => {
	const { mediaUrls, text, privacy, createdAt, id } = post;
	const { name, username, avatar, id: authorId } = post.author;
	const postToUpdate = useAppSelector((state) => state.post.postToUpdate);
	if (postToUpdate == post.id) return <PostEditor post={post} />;
	return (
		<div className="self-center w-full pt-4 rounded-box bg-base-200 hover:brightness-90 transition-all duration-300">
			<div className="flex">
				<button className="w-14 h-14 btn btn-circle overflow-hidden ml-4 bg-neutral">
					<Image width={56} height={56} src={avatar} alt="avatar" />
				</button>
				<div className="flex-1" style={{ width: "calc(100% - 4.5rem)" }}>
					<PostHead
						privacy={privacy}
						avatar={avatar}
						createdAt={createdAt}
						name={name}
						username={username}
						authorId={authorId}
						postId={id}
					/>
					{post.rePostedPostId ? (
						<PostRePostBody
							rePostedPostId={post.rePostedPostId}
							text={post.text}
						/>
					) : (
						<PostBody mediaUrls={mediaUrls!} text={text!} />
					)}
				</div>
			</div>
			<PostInteractions postId={post.id} authorId={authorId} />
		</div>
	);
};
