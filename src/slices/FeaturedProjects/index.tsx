import { ArrowLink } from "@/app/components/arrow-link";
import { ArrowOutIcon } from "@/app/components/icons";
import { Tags } from "@/app/components/tags";
import { createClient } from "@/prismicio";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Link from "next/link";

/**
 * Props for `FeaturedProjects`.
 */
export type FeaturedProjectsProps =
  SliceComponentProps<Content.FeaturedProjectsSlice>;

/**
 * Component for "FeaturedProjects" Slices.
 */
const FeaturedProjects = async ({ slice }: FeaturedProjectsProps): Promise<JSX.Element> => {
  const client = createClient();

  const projects = await client.getAllByType('project', {
    limit: 5
  });

  const projectsRendered = projects.map((project) => {
    const { uid, data, tags } = project;

    return (
      <li className="mb-12" key={uid}>
        <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
          <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
          <div className="z-10 sm:order-2 sm:col-span-6">
            <h3>
              <ArrowLink linkField={data.project_link}>
                {data.title}
              </ArrowLink>
            </h3>
            <PrismicRichText field={data.description} components={{ paragraph: ({ children }) => <p className="mt-2 text-sm leading-normal">{children}</p>}} />
            <Tags tags={tags} />
          </div>
          <PrismicNextImage
            className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 sm:order-1 sm:col-span-2 sm:translate-y-1"
            field={data.project_image}
          />
        </div>
      </li>
    )
  })

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id="projects"
      className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
      aria-label="Selected Projects"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">Projects</h2>
      </div>
      <div>
        <ul className="group/list">
          {projectsRendered}
        </ul>
      </div>
      <div className="mt-12">
        <ArrowLink arrowDirection="right" href="#">
          Full Project Archive
        </ArrowLink>
      </div>
    </section>
  );
};

export default FeaturedProjects;
