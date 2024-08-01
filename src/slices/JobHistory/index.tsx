import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `JobHistory`.
 */
export type JobHistoryProps = SliceComponentProps<Content.JobHistorySlice>;

/**
 * Component for "JobHistory" Slices.
 */
const JobHistory = ({ slice }: JobHistoryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for job_history (variation: {slice.variation})
      Slices
    </section>
  );
};

export default JobHistory;
