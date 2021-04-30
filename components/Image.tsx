import React, { ReactElement } from 'react';
import NextImage from 'next/image';

interface Props {
    image: string;
    name: string;
}

export default function Image({ image, name }: Props): ReactElement {
    if (image.startsWith('/')) {
        return <NextImage src={image} width={50} height={50} alt={name} data-testid="image" />;
    }
    return (
        <>
            {/* used for non optimizable entries (files not stored in public directory) */}
            <img data-testid="image" src={image} width={50} height={50} alt={name} />
        </>
    );
}
