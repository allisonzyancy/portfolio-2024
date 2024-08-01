import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { components } from "../RichText";

/**
 * Props for `SelfBlurb`.
 */
export type SelfBlurbProps = SliceComponentProps<Content.SelfBlurbSlice>;

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
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">About</h2>
      </div>
      <PrismicRichText field={slice.primary.blurb} components={components} />
    </section>
  );
};

export default SelfBlurb;
