import { ArrowLink } from "@/app/components/arrow-link";
import { Tags } from "@/app/components/tags";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useMemo } from "react";

/**
 * Props for `ProjectArchive`.
 */
export type ProjectArchiveProps =
  SliceComponentProps<Content.ProjectArchiveSlice>;

/**
 * Component for "ProjectArchive" Slices.
 */
const ProjectArchive = async ({ slice }: ProjectArchiveProps): Promise<JSX.Element> => {
  const client = createClient();

  const projects = await client.getAllByType('project', {
    orderings: { field: 'document.first_publication_date', direction: 'asc' },
    graphQuery: `{
      project {
        ...projectFields
        project_job {
          ...on job {
            date_ended
            company_name
          }
        }
      }
    }`
  });

  const tableRows = !!projects.length && projects.sort((a: any, b:any) => {
    const aDate = +(a.data?.year);
    const bDate = +(b.data?.year);

    return bDate - aDate;
  }).map((project: any) => {
    const { uid, data, tags } = project;

    const linkText = data.project_link.url?.split('').length > 25 ? data.title : data.project_link.url;

    return (
      <tr key={uid}
        className="border-b border-slate-300/10 last:border-none"
      >
        <td className="py-4 pr-4 align-top text-sm">
          <div className="translate-y-px">{data.year}</div>
        </td>
        <td className="py-4 pr-4 align-top font-semibold leading-snug text-slate-200">
          <div>
            <div className="block sm:hidden">
              {
                data.project_link ? (
                  <ArrowLink linkField={data.project_link}>
                    {data.title}
                  </ArrowLink>
                ) : data.title
              }
            </div>
            <div className="hidden sm:block">
              {data.title}
            </div>
          </div>
        </td>
        <td className="hidden py-4 pr-4 align-top text-sm lg:table-cell">
          <div className="translate-y-px whitespace-nowrap">
            {data.project_job.data.company_name}
          </div>
        </td>
        <td className="hidden py-4 pr-4 align-top lg:table-cell">
          <Tags tags={tags} noMargin={true} />
        </td>
        <td className="hidden py-4 align-top sm:table-cell">
          <ArrowLink linkField={data.project_link} className="text-sm whitespace-nowrap">
            {linkText}
          </ArrowLink>
        </td>
      </tr>
    )
  });

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="pb-64"
    >
      <table className="mt-12 w-full border-collapse text-left">
        <thead className="sticky top-0 z-10 border-b border-slate-300/10 bg-slate-900/75 px-6 py-5 backdrop-blur">
          <tr>
            <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Year</th>
            <th className="py-4 pr-8 text-sm font-semibold text-slate-200">Project</th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">Made at</th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 lg:table-cell">Built with</th>
            <th className="hidden py-4 pr-8 text-sm font-semibold text-slate-200 sm:table-cell">Link</th></tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectArchive;
