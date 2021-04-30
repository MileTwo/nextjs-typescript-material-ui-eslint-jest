// you want to import from test-utils instead of testing-library/react since we overwrote the render function to support our wrapper providers
import { render, screen } from '../test-utils';
import Tool, { getStaticPaths, getStaticProps } from '../../pages/tool/[id]';
import { tools } from '../../lib/tools';

describe('Tool Page', () => {
    it('should render  a page without errors', async () => {
        render(<Tool tool={{ ...tools[0], id: 0 }} />);

        // go home button
        expect(screen.getByRole('button', { name: 'Link to Home' })).toBeInTheDocument();
        // header
        expect(screen.getByRole('heading', { name: tools[0].name })).toBeInTheDocument();
        // image
        expect(screen.getByTestId('image')).toBeInTheDocument();
        // description
        expect(screen.getByText(tools[0].description));
        // link to docs
        expect(screen.getByText('Visit documentation')).toBeInTheDocument();
    });
    it('getStaticPath', async () => {
        const paths = await getStaticPaths();
        expect(paths.paths.length).toBeGreaterThan(tools.length - 1); // in case they added tools to the db
    });
    it('fails to getStaticProps', async () => {
        // @ts-ignore
        const staticProps = await getStaticProps({ params: null });

        expect(staticProps).toEqual({
            notFound: true,
        });
    });
});
