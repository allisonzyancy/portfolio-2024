export const Tags = ({ tags, noMargin = false }: any): JSX.Element => {
  const classes = [
    'flex flex-wrap',
    !noMargin ? 'mt-2' : ''
  ].join(' ');

  const tagClasses = [
    'mr-1.5',
    !noMargin ? 'mt-2' : 'my-1'
  ].join(' ');

  return (
    <ul className={classes} aria-label="technologies used">
      {tags.map((tag: string) => {
        return (
          <li key={tag.replaceAll(' ', '-')} className={tagClasses}>
            <div className="flex items-center rounded-full bg-pink-400/10 px-3 py-1 text-xs font-medium leading-5 text-pink-300">{tag}</div>
          </li>
        )
      })}
    </ul>
  )
}
