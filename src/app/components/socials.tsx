import { EmailIcon, GithubIcon, LinkedInIcon } from "./icons"

export const Socials = (): JSX.Element => {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social Media">
      <li className="mr-5 textg-xs shrink-0">
        <a className="block hover:text-pink-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Github (opens in new tab)"
          title="Github"
          href="https://github.com/allisonzyancy"
        >
          <span className="sr-only">Github</span>
          <GithubIcon />
        </a>
      </li>
      <li className="mr-5 textg-xs shrink-0">
        <a className="block hover:text-pink-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="LinkedIn (opens in new tab)"
          title="LinkedIn"
          href="https://www.linkedin.com/in/allisonyancy"
        >
          <span className="sr-only">LinkedIn</span>
          <LinkedInIcon />
        </a>
      </li>
      <li className="mr-5 textg-xs shrink-0">
        <a className="block hover:text-pink-300"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="email (opens email application)"
          title="email"
          href="mailto:allisonzyancy@gmail.com"
        >
          <span className="sr-only">E-mail</span>
          <EmailIcon />
        </a>
      </li>
    </ul>
  )
}