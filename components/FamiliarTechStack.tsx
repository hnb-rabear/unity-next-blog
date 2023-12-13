import React from 'react'
import components from '../components/icons/techIcons'

export function FamiliarTechStack({ techStack }) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((t) => {
        const Icon = components[t]
        return (
          <div
            key={t}
            className="flex items-center justify-center gap-2 rounded-sm bg-gray-700 p-1 px-2 text-sm font-bold text-gray-100 dark:bg-white dark:text-gray-700 md:text-base"
          >
            {t}
            {Icon ? <Icon /> : null}
          </div>
        )
      })}
    </div>
  )
}
