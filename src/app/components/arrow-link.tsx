import { PrismicNextLink } from "@prismicio/next"
import { ArrowOutIcon, ArrowRightIcon } from "./icons"
import { ReactNode } from "react"
import { LinkField } from "@prismicio/client"

type ArrowLinkProps = {
  children?: ReactNode | JSX.Element | JSX.Element[],
  linkField?: LinkField,
  href?: string,
  simple?: boolean,
  className?: string,
  arrowDirection?: 'out' | 'right'
}

export const ArrowLink = ({
  children,
  linkField,
  simple,
  className,
  href,
  arrowDirection = 'out'
}: ArrowLinkProps): JSX.Element => {
  const classes = [
    'inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-pink-300 focus-visible:text-pink-300  group/link text-base relative',
    className
  ].join(' ');

  const theLinkContent = (
    <>
      {!simple && <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>}
      <span>
        {children}
        <span className="inline-block ml-1">
          { arrowDirection === 'out' ? <ArrowOutIcon /> : <ArrowRightIcon />}
        </span>
      </span>
    </>
  );

  if (!linkField && href) {
    return (
      <a className={classes} href={href} target="_blank">
        {theLinkContent}
      </a>
    )
  }

  return (
    <PrismicNextLink field={linkField} className={classes}>
      {theLinkContent}
    </PrismicNextLink>
  )
}