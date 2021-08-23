// you want to import from test-utils instead of testing-library/react since we overwrote the render function to support our wrapper providers
import { render, screen } from '../test-utils';
import Tool, { getServerSideProps } from '../../pages/tool/[id]';
import { tools } from '../../lib/tools';
import prisma from '../../services/prisma';

describe('Tool Page', () => {
    it('should render  a page without errors', async () => {
        render(<Tool tool={{ ...tools[0], id: 0 }} />);

        // go home button
        expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
        // header
        expect(screen.getByRole('heading', { name: tools[0].name })).toBeInTheDocument();
        // image
        expect(screen.getByTestId('image')).toBeInTheDocument();
        // description
        expect(screen.getByText(tools[0].description));
        // link to docs
        expect(screen.getByText(`Visit ${tools[0].name} documentation`)).toBeInTheDocument();
    });

    it('should fail to render a page', async () => {
        //@ts-ignore
        render(<Tool />);
        expect(screen.getByText('Tool not found.')).toBeInTheDocument();
    });

    it('should getServerSideProps', async () => {
        const tool = await prisma().tool.findFirst();
        // @ts-ignore
        const props = await getServerSideProps({
            params: { id: `${tool?.id}` },
        });
        expect(props).toEqual({ props: { tool } });
    });
    it('should return notFound getServerSideProps', async () => {
        // @ts-ignore
        expect(await getServerSideProps({ params: {} })).toEqual({ notFound: true });

        // @ts-ignore
        expect(await getServerSideProps({ params: { id: '-1' } })).toEqual({ notFound: true });
    });
});
