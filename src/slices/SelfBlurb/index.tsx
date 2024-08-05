import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { components } from "../RichText";
import { PrismicNextLink } from "@prismicio/next";

/**
 * Props for `SelfBlurb`.
 */
export type SelfBlurbProps = SliceComponentProps<Content.SelfBlurbSlice>;

const theseComponents: JSXMapSerializer = {
  ...components,
  hyperlink: ({ node, children }) => {
    const classNames = [
      'font-medium text-pink-300 hover:text-pink-400 focus-visible:text-pink-300 text-opacity-100'
    ];

    if (node?.data?.url === '#') {
      classNames.push('gundam-link');
    }
  
    return (
      <PrismicNextLink field={node.data} className={classNames.join(' ')}>{children}</PrismicNextLink>
    );
  },
}

/**
 * Component for "SelfBlurb" Slices.
 */
const SelfBlurb = ({ slice }: SelfBlurbProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="about"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24 lg:text-lg"
      aria-label="About Me"
    >
      <div className="sticky-section-header sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 md:text-md lg:text-lg">About</h2>
      </div>
      <PrismicRichText field={slice.primary.blurb} components={theseComponents} />
    </section>
  );
};

export default SelfBlurb;
