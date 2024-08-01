export const Tags = ({ tags }: any): JSX.Element => {
  return (
    <ul className="mt-2 flex flex-wrap" aria-label="technologies used">
      {tags.map((tag: string) => {
        return (
          <li key={tag.replaceAll(' ', '-')} className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-pink-400/10 px-3 py-1 text-xs font-medium leading-5 text-pink-300">{tag}</div>
          </li>
        )
      })}
    </ul>
  )
}
