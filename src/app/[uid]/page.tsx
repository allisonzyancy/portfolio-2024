import { Metadata } from "next";
import { notFound } from "next/navigation";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextLink } from "@prismicio/next";
import { ArrowLeftIcon } from "../components/icons";
import { components as rtComponents } from '@/slices/RichText';

type Params = { uid: string };

/**
 * This page renders a Prismic Document dynamically based on the URL.
 */

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.title,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title || undefined,
      images: [
        {
          url: page.data.meta_image.url || "",
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  const pageClasses = [
    'md:pt-24',
    params.uid === 'assistant' ? 'flex flex-col' : ''
  ].join(' ');

  return (
    <div className={pageClasses} style={params.uid === 'assistant' ? { flex: '1 1 1rem'} : {}}>
      <PrismicNextLink href="/" className="group mb-2 inline-flex items-center font-semibold leading-tight text-pink-400 text-xl">
        <ArrowLeftIcon />
        Allison Yancy
      </PrismicNextLink>
      <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl mb-4">{page.data.title}</h1>
      <p className="mb-4 text-slate-200 text-opacity-55">{page.data.subtitle}</p>
      <PrismicRichText field={page.data.lead_text} components={rtComponents} />
      <SliceZone slices={page.data.slices} components={components} />
    </div>
  );
}

export async function generateStaticParams() {
  const client = createClient();

  /**
   * Query all Documents from the API, except the homepage.
   */
  const pages = await client.getAllByType("page", {
    predicates: [prismic.filter.not("my.page.uid", "home")],
  });

  /**
   * Define a path for every Document.
   */
  return pages.map((page) => {
    return { uid: page.uid };
  });
}
