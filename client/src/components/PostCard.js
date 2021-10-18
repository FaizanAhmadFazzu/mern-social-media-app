import React from 'react'
import CardHeader from './home/post_card/CardHeader';
import CardBody from './home/post_card/CardBody';
import CardFooter from './home/post_card/CardFooter';

const PostCard = ({post, theme}) => {
    return (
        <div className="card my-3">
            <CardHeader post={post} />
            <CardBody />
            <CardFooter />
        </div>
    )
}

export default PostCard
