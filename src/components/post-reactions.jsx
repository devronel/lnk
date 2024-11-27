import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs";

const reactionIcons = {
    heart: <FaHeart className="text-red-500 text-sm" />,
    like: <AiFillLike className="text-blue-500 text-sm" />,
    wow: <BsFillEmojiSurpriseFill className="text-yellow-500 text-sm" />,
};

const PostReaction = ({ postReactions, reactionCount }) => {
    if (!postReactions) {
        return <p className="text-xs">No one reacted to this post.</p>;
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
                        className={`${index > 0 ? "-ml-[6px]" : ""
                            } border border-lnk-gray bg-lnk-white p-[2px] rounded-full`}
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