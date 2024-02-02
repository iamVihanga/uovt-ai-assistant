import Avatar from "@/components/Avatar";
import ChatUI from "@/components/ChatUI";

export default function Home() {
  return (
    <div className="flex items-center h-screen max-h-screen overflow-hidden bg">
      <div className="flex-1 max-h-screen ">
        <img src="poster1.png" className="w-full h-full" />
      </div>

      <div className="max-h-screen w-[600px] overflow-scroll">
        <ChatUI />
      </div>
    </div>
  );
}
