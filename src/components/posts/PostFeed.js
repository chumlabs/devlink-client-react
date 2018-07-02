import React from 'react';
import PropTypes from 'prop-types';

// components
import PostItem from './PostItem';

const PostFeed = props => {
  const { posts } = props;
  return posts.map(post => <PostItem key={post._id} post={post} />);
};

// proptypes
PostFeed.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostFeed;
