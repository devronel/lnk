import { FaHeart } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { BsFillEmojiSurpriseFill } from "react-icons/bs";

const reactionIcons = {
    heart: <span className=" bg-red-500 w-4 h-4 p-[3px] rounded-full flex items-center justify-center"><FaHeart className="text-lnk-white text-xs" /></span>,
    like: <span className=" bg-blue-500 w-4 h-4 p-[3px] rounded-full flex items-center justify-center"><AiFillLike className="text-lnk-white text-xs" /></span>,
    wow: <span className=" bg-yellow-500 w-4 h-4 p-[3px] rounded-full flex items-center justify-center"><BsFillEmojiSurpriseFill className="text-lnk-white text-xs" /></span>,
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
                        className={`${index > 0 ? "-ml-[3px]" : ""} rounded-full`}
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