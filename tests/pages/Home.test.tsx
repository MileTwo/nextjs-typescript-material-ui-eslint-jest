// you want to import from test-utils instead of testing-library/react since we overwrote the render function to support our wrapper providers
import { render, screen } from '../test-utils';
import Home, { getServerSideProps } from '../../pages/index';
import { tools } from '../../lib/tools';

describe('Home page', () => {
    it('should render without errors', async () => {
        render(<Home tools={tools.map(({ name, image }) => ({ name, image }))} />);

        // header
        expect(screen.getByRole('heading', { name: 'Next.js example' })).toBeInTheDocument();
        // tools header
        expect(screen.getByRole('heading', { name: 'Tools' })).toBeInTheDocument();

        // array of tools
        expect(screen.getAllByRole('listitem').length).toEqual(tools.length);
        // link button to tool page
        expect(screen.getAllByRole('button', { name: 'Learn more' }).length).toEqual(tools.length);
        // image
        const firstTool = screen.getAllByRole('listitem')[0];
        expect(firstTool.querySelector('img')).toBeInTheDocument();
        // name
        // @ts-ignore
        expect(firstTool.querySelector('p', { name: tools[0].name })).toBeInTheDocument();
    });
    it('serverSideProps', async () => {
        // @ts-ignore
        const response = await getServerSideProps();
        expect(response).toEqual({
            props: {
                tools: tools.map(({ name, image }) => ({
                    name,
                    image,
                })),
            },
        });
    });
});
