import IconView from './icons'

export function FamiliarTechStack({ techStack }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((t) => {
        return (
          <div
            key={t}
            className=":border-white flex items-center justify-center gap-2 rounded-md border bg-black p-1 px-2 text-sm font-bold text-white md:text-base"
          >
            {t}
            <div>
              <IconView kind="mail" href="#" size={2} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
