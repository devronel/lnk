import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs";

import wowIcon from '../assets/icons/wow.png'
import likeIcon from '../assets/icons/like.png'
import heartIcon from '../assets/icons/heart.png'

const reactionIcons = {
    heart: <span className="flex items-center justify-center"><img width={23} height={23} src={heartIcon} alt="Heart icon" /></span>,
    like: <span className=" flex items-center justify-center"><img width={23} height={23} src={likeIcon} alt="Like icon" /></span>,
    wow: <span className=" flex items-center justify-center"><img width={18} height={18} src={wowIcon} alt="Wow icon" /></span>,
};

const PostReaction = ({ postReactions, reactionCount }) => {
    if (!postReactions) {
        return <p className="text-xs"></p>;
    }

    const reactions = postReactions
        .split(",")
        .map((reaction) => reactionIcons[reaction])
        .filter(Boolean);

    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {reactions.map((icon, index) => (
                    <div
                        key={index}
                        className={`${index > 0 ? "-ml-[6px]" : ""} rounded-full`}
                        style={{ zIndex: reactions.length - index }}
                    >
                        {icon}
                    </div>
                ))}
            </div>
            <p className="text-xs">{reactionCount}</p>
        </div>
    );
};

export default PostReaction