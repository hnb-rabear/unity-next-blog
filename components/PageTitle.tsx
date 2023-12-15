import { getTotalViews, viewPost } from 'lib/prisma';
import { ReactNode } from 'react';
import PostStats from './PostStats';

interface Props {
    slug: string;
    children: ReactNode;
}

export default function PageTitle({ slug, children }: Props) {

    return (
        <>
            <PostStats slug={slug} />
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                {children}
            </h1>
        </>

    );
}
