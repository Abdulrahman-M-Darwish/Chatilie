
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Gender {
    FEMALE = "FEMALE",
    MALE = "MALE"
}

export enum NotificationType {
    FRIEND_ACCEPTED = "FRIEND_ACCEPTED",
    FRIEND_REQUEST = "FRIEND_REQUEST",
    POST_LIKED = "POST_LIKED"
}

export enum Privacy {
    ONLY_FRIENDS = "ONLY_FRIENDS",
    PRIVATE = "PRIVATE",
    PUBLIC = "PUBLIC"
}

export interface AuthorInput {
    email?: Nullable<string>;
    id?: Nullable<string>;
    name?: Nullable<string>;
}

export interface CreateChatInput {
    users: CreateChatUsersInput[];
}

export interface CreateChatUsersInput {
    id: string;
}

export interface CreateFriendInput {
    friendId: string;
}

export interface CreateMessageInput {
    chatId: string;
    mediaUrls?: Nullable<string[]>;
    text?: Nullable<string>;
    userId: string;
}

export interface CreateNotificationInput {
    from: string;
    to: string;
    type: NotificationType;
}

export interface CreatePostInput {
    commentedPostId?: Nullable<string>;
    mediaUrls?: Nullable<string[]>;
    privacy?: Nullable<Privacy>;
    rePostedPostId?: Nullable<string>;
    text?: Nullable<string>;
}

export interface CreateProfileInput {
    gender: Gender;
}

export interface CreateReactionInput {
    postId: string;
    userId: string;
}

export interface CreateUserInput {
    birthDate: string;
    email: string;
    gender: Gender;
    name: string;
    password: string;
    username: string;
}

export interface FindNotificationsInput {
    take?: Nullable<number>;
    where?: Nullable<Where>;
}

export interface FindPostsInput {
    author?: Nullable<AuthorInput>;
    commentedPostId?: Nullable<string>;
    id?: Nullable<string>;
    text?: Nullable<string>;
}

export interface FindUserInput {
    skip?: Nullable<number>;
    take?: Nullable<number>;
}

export interface LoginInput {
    email: string;
    password: string;
}

export interface SignupInput {
    birthDate: string;
    email: string;
    gender: Gender;
    name: string;
    password: string;
    username: string;
}

export interface UpdateMessageInput {
    chatId?: Nullable<string>;
    mediaUrls?: Nullable<string[]>;
    messageId: string;
    text?: Nullable<string>;
    userId?: Nullable<string>;
}

export interface UpdateNotificationInput {
    id: string;
    type?: Nullable<NotificationType>;
}

export interface UpdatePostInput {
    commentedPostId?: Nullable<string>;
    mediaUrls?: Nullable<string[]>;
    privacy?: Nullable<Privacy>;
    rePostedPostId?: Nullable<string>;
    text?: Nullable<string>;
}

export interface UpdateProfileInput {
    bio?: Nullable<string>;
    country?: Nullable<string>;
    cover?: Nullable<string>;
    gender?: Nullable<Gender>;
    hobbies?: Nullable<string[]>;
    reputationOfAllTime?: Nullable<number>;
    reputationOfMonth?: Nullable<number>;
    reputationOfWeek?: Nullable<number>;
    reputationOfYear?: Nullable<number>;
}

export interface UpdateUserInput {
    avatar?: Nullable<string>;
    id?: Nullable<string>;
    isActive?: Nullable<boolean>;
    password?: Nullable<string>;
    profile?: Nullable<UpdateProfileInput>;
    username?: Nullable<string>;
}

export interface UploadMediasInput {
    base64EncodedImages: string[];
    folder: string;
}

export interface Where {
    id?: Nullable<string>;
    isSaw?: Nullable<boolean>;
    type?: Nullable<NotificationType>;
}

export interface FindReaction {
    count: number;
    reactions: Reaction[];
}

export interface Friend {
    avatar: string;
    birthDate: string;
    chatId?: Nullable<string>;
    createdAt: string;
    email: string;
    friends: User[];
    friendsCount: number;
    id: string;
    isActive: boolean;
    name: string;
    notifications: Notification[];
    posts: Post[];
    profile: Profile;
    updatedAt: string;
    username: string;
}

export interface Media {
    access_control: string[];
    access_mode: string;
    bytes: number;
    colors: string[][];
    created_at: string;
    etag: string;
    format: string;
    height: number;
    moderation: string[];
    original_filename: string;
    placeholder: boolean;
    public_id: string;
    resource_type: string;
    secure_url: string;
    signature: string;
    tags: string[];
    type: string;
    url: string;
    version: number;
    width: number;
}

export interface Message {
    author: User;
    createdAt: string;
    id: string;
    mediaUrls?: Nullable<string[]>;
    text?: Nullable<string>;
    updatedAt: string;
}

export interface IMutation {
    createChat(createChatInput: CreateChatInput): User | Promise<User>;
    createFriend(createFriendInput: CreateFriendInput): Friend | Promise<Friend>;
    createMessage(createMessageInput: CreateMessageInput): Message | Promise<Message>;
    createNotification(createNotificationInput: CreateNotificationInput): Notification | Promise<Notification>;
    createPost(createPostInput: CreatePostInput): Post | Promise<Post>;
    createProfile(createProfileInput: CreateProfileInput): Profile | Promise<Profile>;
    createReaction(createReactionInput: CreateReactionInput): Reaction | Promise<Reaction>;
    createUser(createUserInput: CreateUserInput): User | Promise<User>;
    login(loginInput: LoginInput): User | Promise<User>;
    logout(): string | Promise<string>;
    removeChat(id: string): User | Promise<User>;
    removeFriend(id: string): string | Promise<string>;
    removeMessage(id: number): Message | Promise<Message>;
    removeNotification(id: number): Notification | Promise<Notification>;
    removePost(id: string): Post | Promise<Post>;
    removeProfile(id: string): Profile | Promise<Profile>;
    removeReaction(postId: string): string | Promise<string>;
    removeUser(id: string): User | Promise<User>;
    signup(signupInput: SignupInput): User | Promise<User>;
    updateMessage(updateMessageInput: UpdateMessageInput): Message | Promise<Message>;
    updateNotification(updateNotificationInput: UpdateNotificationInput): Notification | Promise<Notification>;
    updatePost(id: string, updatePostInput: UpdatePostInput): Post | Promise<Post>;
    updateProfile(id: string, updateProfileInput: UpdateProfileInput): Profile | Promise<Profile>;
    updateUser(updateUserInput: UpdateUserInput): User | Promise<User>;
    uploadMedias(uploadMediasInput: UploadMediasInput): Media[] | Promise<Media[]>;
}

export interface Notification {
    createdAt: string;
    from: User;
    id: string;
    isSaw: boolean;
    message: string;
    to: User;
    type: NotificationType;
    updatedAt: string;
}

export interface Post {
    author: User;
    commentedPostId?: Nullable<string>;
    createdAt: string;
    id: string;
    mediaUrls?: Nullable<string[]>;
    privacy: Privacy;
    rePostedPostId?: Nullable<string>;
    text?: Nullable<string>;
    updatedAt: string;
}

export interface Profile {
    bio?: Nullable<string>;
    country?: Nullable<string>;
    cover?: Nullable<string>;
    createdAt: string;
    gender: Gender;
    hobbies?: Nullable<string[]>;
    id: string;
    reputationOfAllTime: number;
    reputationOfMonth: number;
    reputationOfWeek: number;
    reputationOfYear: number;
    updatedAt: string;
    user: User;
}

export interface IQuery {
    chats(userId?: Nullable<string>): User[] | Promise<User[]>;
    messages(chatId: string): Nullable<Message[]> | Promise<Nullable<Message[]>>;
    notifications(findNotificationsInput?: Nullable<FindNotificationsInput>): Notification[] | Promise<Notification[]>;
    notificationsCount(userId?: Nullable<string>): number | Promise<number>;
    post(id: string): Post | Promise<Post>;
    posts(findPostsInput?: Nullable<FindPostsInput>): Nullable<Post[]> | Promise<Nullable<Post[]>>;
    profile(id: string): Profile | Promise<Profile>;
    profiles(): Profile[] | Promise<Profile[]>;
    reactions(postId: string): FindReaction | Promise<FindReaction>;
    search(q: string): SearchResults | Promise<SearchResults>;
    user(id: string): User | Promise<User>;
    users(findUserInput?: Nullable<FindUserInput>): User[] | Promise<User[]>;
}

export interface Reaction {
    count: number;
    post: Post;
    user: User;
}

export interface SearchResults {
    posts?: Nullable<Post[]>;
    users?: Nullable<User[]>;
}

export interface ISubscription {
    messageCreated(): Message | Promise<Message>;
    onNotificationCreated(): Notification | Promise<Notification>;
    postAdded(): Post | Promise<Post>;
    postRemoved(): string | Promise<string>;
    postUpdated(): Post | Promise<Post>;
    userUpdated(): User | Promise<User>;
}

export interface User {
    avatar: string;
    birthDate: string;
    chatId?: Nullable<string>;
    createdAt: string;
    email: string;
    friends: User[];
    friendsCount: number;
    id: string;
    isActive: boolean;
    name: string;
    notifications: Notification[];
    posts: Post[];
    profile: Profile;
    updatedAt: string;
    username: string;
}

type Nullable<T> = T | null;
