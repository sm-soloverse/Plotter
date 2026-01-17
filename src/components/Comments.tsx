'use client';

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, Reply, MoreHorizontal, Flag, Trash2, Send } from 'lucide-react';
import { useStore } from '@/store';
import type { Comment as CommentType } from '@/types';

interface CommentsProps {
  assetId: string;
  comments?: CommentType[];
}

// Mock comments for demo
const mockComments: CommentType[] = [
  {
    id: 'comment-1',
    assetId: 'ip-1',
    author: {
      id: 'user-2',
      username: 'worldbuilder42',
      displayName: 'World Builder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=worldbuilder',
      bio: '',
      createdAt: new Date(),
      stats: { creations: 0, followers: 0, following: 0, likes: 0 },
    },
    content: 'This character is so well-developed! I love the backstory about the Shadow Guild. Would you mind if I referenced them in my world?',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    likes: 5,
    replies: [
      {
        id: 'comment-1-reply',
        assetId: 'ip-1',
        author: {
          id: 'user-1',
          username: 'storyweaver',
          displayName: 'Story Weaver',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=storyweaver',
          bio: '',
          createdAt: new Date(),
          stats: { creations: 0, followers: 0, following: 0, likes: 0 },
        },
        content: 'Thank you! Absolutely, feel free to use them. Just add an attribution link if you publish. Would love to see what you create!',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        likes: 3,
      },
    ],
  },
  {
    id: 'comment-2',
    assetId: 'ip-1',
    author: {
      id: 'user-3',
      username: 'mythmaker',
      displayName: 'Myth Maker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mythmaker',
      bio: '',
      createdAt: new Date(),
      stats: { creations: 0, followers: 0, following: 0, likes: 0 },
    },
    content: 'The tension between her past and present is compelling. Have you considered writing a short story about the mission that changed everything?',
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 2,
  },
];

export function Comments({ assetId }: CommentsProps) {
  const { currentUser } = useStore();
  const [comments, setComments] = useState<CommentType[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitComment = () => {
    if (!newComment.trim() || !currentUser) return;

    const comment: CommentType = {
      id: `comment-${Date.now()}`,
      assetId,
      author: currentUser,
      content: newComment,
      createdAt: new Date(),
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim() || !currentUser) return;

    const reply: CommentType = {
      id: `reply-${Date.now()}`,
      assetId,
      author: currentUser,
      content: replyContent,
      createdAt: new Date(),
      likes: 0,
    };

    setComments(comments.map((c) => {
      if (c.id === parentId) {
        return {
          ...c,
          replies: [...(c.replies || []), reply],
        };
      }
      return c;
    }));

    setReplyingTo(null);
    setReplyContent('');
  };

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments(comments.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: c.replies?.map((r) =>
              r.id === commentId ? { ...r, likes: r.likes + 1 } : r
            ),
          };
        }
        return c;
      }));
    } else {
      setComments(comments.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));
    }
  };

  const CommentItem = ({
    comment,
    isReply = false,
    parentId,
  }: {
    comment: CommentType;
    isReply?: boolean;
    parentId?: string;
  }) => (
    <div className={`${isReply ? 'ml-12 mt-4' : ''}`}>
      <div className="flex gap-3">
        <img
          src={comment.author.avatar}
          alt={comment.author.displayName}
          className="w-8 h-8 rounded-full shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-sm">{comment.author.displayName}</span>
            <span className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
            </span>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {comment.content}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition-colors"
            >
              <Heart className="w-3.5 h-3.5" />
              {comment.likes > 0 && comment.likes}
            </button>
            {!isReply && (
              <button
                onClick={() => setReplyingTo(comment.id)}
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-primary-500 transition-colors"
              >
                <Reply className="w-3.5 h-3.5" />
                Reply
              </button>
            )}
            <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                onKeyDown={(e) => e.key === 'Enter' && handleSubmitReply(comment.id)}
              />
              <button
                onClick={() => handleSubmitReply(comment.id)}
                disabled={!replyContent.trim()}
                className="btn-primary py-2 px-3"
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setReplyingTo(null);
                  setReplyContent('');
                }}
                className="btn-ghost py-2 px-3 text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              isReply
              parentId={comment.id}
            />
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Comments ({comments.length})</h3>

      {/* New Comment Input */}
      {currentUser ? (
        <div className="flex gap-3">
          <img
            src={currentUser.avatar}
            alt={currentUser.displayName}
            className="w-8 h-8 rounded-full shrink-0"
          />
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              onKeyDown={(e) => e.key === 'Enter' && handleSubmitComment()}
            />
            <button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              className="btn-primary gap-1.5"
            >
              <Send className="w-4 h-4" />
              Post
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-500 text-sm">
            <a href="/login" className="text-primary-600 hover:underline">Log in</a> to leave a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No comments yet. Be the first to share your thoughts!</p>
        </div>
      )}
    </div>
  );
}
