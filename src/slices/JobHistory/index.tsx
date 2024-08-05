import { ArrowLink } from "@/app/components/arrow-link";
import { ArrowOutIcon } from "@/app/components/icons";
import { ListItem } from "@/app/components/list-item";
import { Tags } from "@/app/components/tags";
import { createClient } from "@/prismicio";
import { getTheMonth } from "@/utils/month";
import { Content, asDate } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

/**
 * Props for `JobHistory`.
 */
export type JobHistoryProps = SliceComponentProps<Content.JobHistorySlice>;

/**
 * Component for "JobHistory" Slices.
 */
const JobHistory = async ({ slice }: JobHistoryProps): Promise<JSX.Element> => {
  const client = createClient();

  const jobs = await client.getAllByType('job', {
    orderings: {
      field: 'my.job.date_ended',
      direction: 'desc',
    },
  });

  const jobList = jobs.map((job, i) => {
    const { data, uid, tags } = job;

    const theStartDate = asDate(data.date_started);
    const theEndDate = asDate(data.date_ended);

    const startMonth = theStartDate ? getTheMonth(theStartDate.getMonth()) : null;
    const startYear = theStartDate ? theStartDate.getFullYear() : null;

    const endMonth = theEndDate ? getTheMonth(theEndDate.getMonth()) : null;
    const endYear = theEndDate ? theEndDate.getFullYear() : null;
    
    let startDate,
      endDate;

    if (startYear === endYear && startYear && endYear) {
      startDate = `${startMonth}`;
      endDate = `${endMonth} ${endYear}`;
    } else {
      startDate = startYear;
      endDate = endYear;
    }
  
    return (
      <ListItem key={uid}>
        <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2" aria-label={`${startDate} to ${endDate}`}>{startDate} &mdash; {endDate}</header>
        <div className="z-10 sm:col-span-6">
          <h3 className="font-medium leading-snug text-slate-200">
            <div>
              <ArrowLink linkField={data.company_link}>
                {data.job_title} &bull; {data.company_name}
              </ArrowLink>
            </div>
          </h3>
          <PrismicRichText field={data.job_description} components={{ paragraph: ({ children }) => <p className="mt-2 text-sm leading-normal">{children}</p>}} />
          <Tags tags={tags} />
        </div>
      </ListItem>
    )
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="experience"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div className="sticky-section-header sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 md:text-md lg:text-lg">Experience</h2>
      </div>
      <ol className="group/list">
        {jobList}
      </ol>
      <div className="mt-12">
        <ArrowLink href="https://ay-portfolio-2024.cdn.prismic.io/ay-portfolio-2024/ZrEprEaF0TcGIsi7_AY_Resume_2024.pdf" target="_blank">
          View Full Résumé
        </ArrowLink>
      </div>
    </section>
  );
};

export default JobHistory;
