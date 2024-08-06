import Chatbot from "@/app/components/chatbot/chatbot";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `FullChatbot`.
 */
export type FullChatbotProps = SliceComponentProps<Content.FullChatbotSlice>;

/**
 * Component for "FullChatbot" Slices.
 */
const FullChatbot = ({ slice }: FullChatbotProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pt-12 flex"
      style={{ flex: '1 1 1rem' }}
    >
      <div className="w-full pb-24 flex">
        <Chatbot fullVersion />
      </div>
    </section>
  );
};

export default FullChatbot;
