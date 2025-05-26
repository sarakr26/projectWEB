import React from 'react';
import { Review as ReviewType } from '@/app/services/reviewService';
import { Star, UserCircle } from 'lucide-react';

interface ReviewItemProps {
  review: ReviewType;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const reviewerName = review.reviewer?.name || 'Anonymous User';
  const avatarUrl = review.reviewer?.avatar_url;

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0 last:pb-0">
      <div className="flex items-start space-x-3">
        {avatarUrl ? (
          <img 
            src={avatarUrl.startsWith('http') ? avatarUrl : `${process.env.REACT_APP_API_BASE_URL}${avatarUrl}`} 
            alt={reviewerName} 
            className="h-10 w-10 rounded-full object-cover" 
            onError={(e) => (e.currentTarget.src = '/default-avatar.png')} // Fallback avatar
          />
        ) : (
          <UserCircle className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{reviewerName}</h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(review.created_at).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center my-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">({review.rating.toFixed(1)})</span>
          </div>
          {review.comment && (
            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{review.comment}</p>
          )}
          {!review.comment && (
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">No comment provided.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;