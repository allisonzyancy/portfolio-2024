"use client";

import { PrismicRichText } from "@prismicio/react"
import Link from "next/link"
import Chatbot from "./chatbot/chatbot"
import { Socials } from "./socials"

const HomeHeader: React.FC = ({ home }:any) => {

  return (
    <header id="home-sidebar" className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
      <div className="sm:pr-24">
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl">{home.data.title}</h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-pink-400 sm:text-xl mb-4">{home.data.subtitle}</h2>
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

        <Chatbot />
      </div>
      <Socials />
    </header>
  )
}

export default HomeHeader;