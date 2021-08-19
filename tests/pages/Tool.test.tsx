// you want to import from test-utils instead of testing-library/react since we overwrote the render function to support our wrapper providers
import { render, screen } from '../test-utils';
import Tool from '../../pages/tool/[id]';
import { tools } from '../../lib/tools';

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
});
