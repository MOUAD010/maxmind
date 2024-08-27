import { LiaComments } from "react-icons/lia";
import { MdDateRange } from "react-icons/md";
import { VscReactions } from "react-icons/vsc";
import Charts from "./Charts";

const PostDisplay = ({ item }: any) => {
  return (
    <div className=" my-4 border-2 border-gray-800 shadow-lg" key={item.id}>
      {/* ********************************************************************************** */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
        <img
          src={item.full_picture}
          alt="Info Card Image"
          className="rounded-md object-fit w-[400px] h-[450px]"
          // style={{ aspectRatio: "700/600", objectFit: "cover" }}
        />
        <div className="space-y-4">
          <h2 className="text-2xl font-bold"> {item.id}</h2>
          <p className=" break-words">{item.message}</p>

          <div className="flex items-center gap-4">
            <MdDateRange className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium">
              {item.created_time}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* <UsersIcon className="w-6 h-6 text-primary" /> */}
            <VscReactions className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium">
              {item.reactions.data && <div>No reactions</div>}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* <UsersIcon className="w-6 h-6 text-primary" /> */}
            <LiaComments className="w-6 h-6 text-primary" />
            <span className="text-primary font-medium">
              {item.comments.data && <div>No comments</div>}
            </span>
          </div>
        </div>
      </div>
      <div>
        <Charts post_id={item.id} />
      </div>
    </div>
  );
};

export default PostDisplay;
