import type { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import {
  PrismicRichText,
  SliceComponentProps,
  JSXMapSerializer,
} from "@prismicio/react";
import styles from "./index.module.css";

export const components: JSXMapSerializer = {
  paragraph: ({ children }) => {
    return <p className="mb-4 text-slate-200 text-opacity-55">{children}</p>
  },
  hyperlink: ({ node, children }) => {
    return <PrismicNextLink field={node.data} className="font-medium text-pink-300 hover:text-pink-400 focus-visible:text-pink-300 text-opacity-100">{children}</PrismicNextLink>;
  },
  label: ({ node, children }) => {
    if (node.data.label === "codespan") {
      return <code>{children}</code>;
    }
  },
  strong: ({ node, children }) => {
    return <strong className="font-bold text-pink-300">{children}</strong>
  },
  heading6: ({ children }) => {
    return <h6 className="text-xs max-w-96">{ children }</h6>
  }
};

/**
 * Props for `RichText`.
 */
type RichTextProps = SliceComponentProps<Content.RichTextSlice>;

/**
 * Component for "RichText" Slices.
 */
const RichText = ({ slice }: RichTextProps): JSX.Element => {
  return (
    <section className={styles.richtext}>
      <PrismicRichText field={slice.primary.content} components={components} />
    </section>
  );
};

export default RichText;
