import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SkillsSection`.
 */
export type SkillsSectionProps =
  SliceComponentProps<Content.SkillsSectionSlice>;

/**
 * Component for "SkillsSection" Slices.
 */
const SkillsSection = ({ slice }: SkillsSectionProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for skills_section (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SkillsSection;
