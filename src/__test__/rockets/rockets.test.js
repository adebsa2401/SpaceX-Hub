import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import axios from 'axios';
import { act } from 'react-dom/test-utils';
import App from '../../App';

jest.mock('axios');

describe('Test Rockets component and interactions', () => {
  beforeEach(async () => {
    axios.get.mockImplementation((url) => {
      if (url === 'https://api.spacexdata.com/v3/rockets') {
        return Promise.resolve({
          data: [
            {
              rocket_name: 'Falcon 1',
              id: 1,
              description: 'Falcon 1 was an expendable launch system privately developed and manufactured by SpaceX during 2006-2009',
              flickr_images: ['https://live.staticflickr.com/65535/49906273043_0b0d8d6b0c_b.jpg'],
            },
            {
              rocket_name: 'Falcon 9',
              id: 2,
              description: 'Falcon 9 is a two-stage rocket designed and manufactured by SpaceX for the reliable and safe transport of satellites and the Dragon spacecraft into orbit.',
              flickr_images: ['https://live.staticflickr.com/65535/49906273043_0b0d8d6b0c_b.jpg'],
            },
            {
              rocket_name: 'Falcon Heavy',
              id: 3,
              description: 'Falcon Heavy is a heavy-lift launch vehicle designed and manufactured by SpaceX for the reliable and safe transport of satellites, the Dragon spacecraft, and other payloads into orbit.',
              flickr_images: ['https://live.staticflickr.com/65535/49906273043_0b0d8d6b0c_b.jpg'],
            },
          ],
        });
      }

      if (url === 'https://api.spacexdata.com/v3/missions') {
        return Promise.resolve({
          data: [
            {
              mission_name: 'FalconSat',
              mission_id: '1',
              description: 'FalconSat was an experimental communications satellite built by SpaceX.',
            },
            {
              mission_name: 'DemoSat',
              mission_id: '2',
              description: 'DemoSat was an artificial intelligence (AI) satellite developed by the Space Exploration Technologies Corporation (SpaceX).',
            },
            {
              mission_name: 'Trailblazer',
              mission_id: '3',
              description: 'Trailblazer is a technology demonstration mission to test the capabilities of the Falcon 9 launch vehicle and Dragon spacecraft.',
            },
          ],
        });
      }

      return Promise.reject(new Error('Not Found'));
    });

    await act(async () => render(<App />));
  });

  it('3 Rockets are rendered', async () => {
    expect(screen.queryAllByRole('button', { name: /Reserve Rocket/i }).length).toBe(3);
  });

  it('Test rocket reservation', async () => {
    expect(screen.queryAllByText(/Reserved/i).length).toBe(0);

    await act(async () => userEvent.click(screen.getAllByRole('button', { name: /Reserve Rocket/i })[0]));
    expect(screen.queryAllByRole('button', { name: /Reserve Rocket/i }).length).toBe(2);
    expect(screen.queryAllByRole('button', { name: /Cancel Reserve/i }).length).toBe(1);
    expect(screen.queryAllByText(/Reserved/i).length).toBe(1);

    await act(async () => userEvent.click(screen.getAllByRole('button', { name: /Cancel Reserve/i })[0]));
    expect(screen.queryAllByRole('button', { name: /Reserve Rocket/i }).length).toBe(3);
    expect(screen.queryAllByRole('button', { name: /Cancel Reserve/i }).length).toBe(0);
    expect(screen.queryAllByText(/Rserved/i).length).toBe(0);
  });
});
