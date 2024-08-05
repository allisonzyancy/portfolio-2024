import { Metadata } from "next";

import { PrismicRichText, SliceZone } from "@prismicio/react";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Socials } from "./components/socials";
import Link from "next/link";

// This component renders your homepage.
//
// Use Next's generateMetadata function to render page metadata.
//
// Use the SliceZone to render the content of the page.

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return {
    title: home.data.title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}

export default async function Index() {
  // The client queries content from the Prismic API
  const client = createClient();
  const home = await client.getByUID("page", "home");

  return (
    <div className="lg:flex lg:justify-between lg:gap-4">
      <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-pink-400 sm:text-5xl">{home.data.title}</h1>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl mb-4">{home.data.subtitle}</h2>
          <PrismicRichText field={home.data.lead_text} components={{ strong: ({ children }) => <span className="font-bold text-pink-300">{children}</span>}}/>

          <nav className="nav">
            <ul className="mt-4 w-max md:mt-16">
              <li>
                <Link className="group flex items-center py-3 active" href="#about">
                  <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-pink-300 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-pink-300 group-focus-visible:text-pink-400">About</span>
                </Link>
              </li>
              <li>
                <Link className="group flex items-center py-3 " href="#experience">
                  <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-pink-300 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-pink-300 group-focus-visible:text-pink-400">Experience</span>
                </Link>
              </li>
              <li>
                <Link className="group flex items-center py-3 " href="#projects">
                  <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-pink-300 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
                  <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-pink-300 group-focus-visible:text-slate-200">Projects</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <Socials />
      </header>
      
      <main className="pt-24 lg:w-1/2 lg:py-24">
        <SliceZone slices={home.data.slices} components={components} />

        <div>
          Site developed in <a className="text-pink-200 hover:text-pink-300 transition-all" href="https://nextjs.com" target="_blank">React</a> with <a href="https://nextjs.org" target="_blank" className="text-pink-200 hover:text-pink-300 transition-all">next.js</a> and <a href="https://tailwindcss.com/" target="_blank" className="text-pink-200 hover:text-pink-300 transition-all">Tailwind CSS</a> and deployed with Vercel. Reach out on <a href="https://linkedin.com/in/allisonyancy" target="_blank" className="text-pink-200 hover:text-pink-300 transition-all">LinkedIn</a> or e-mail me at <a href="mailto:allisonzyancy@gmail.com" target="_blank" className="text-pink-200 hover:text-pink-300 transition-all">allisonzyancy@gmail.com</a> for any inquiries about potential work.
        </div>
      </main>
    </div>
  );
}
