import { MessageDto } from "@/models/MessageDto";
import Markdown from "react-markdown";

interface MessageProps {
  message: MessageDto;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const containerClasses = [
    'w-auto mb-4 flex',
    message.isUser ? 'text-align-right user-msg-container justify-end' : 'text-align-left ai-msg-container'
  ].join(' ');

  const messageClasses = [
    'w-auto rounded-lg p-4 max-w-3/4',
    message.isUser ? 'bg-pink-400/10 text-pink-300 user-msg' : 'bg-slate-700/50 text-slate-200 ai-msg',
  ].join(' ');

  return (
    <div className={containerClasses}>
      <div className={messageClasses} style={{
        maxWidth: '85%'
      }}>
        {message.content.split("\n").map((text, i) => (
          <>
            <Markdown>{text}</Markdown>
            {i !== message.content.split("\n").length - 1? <br /> : null}
          </>
        ))}
      </div>
    </div>
  );
}

export default Message;
