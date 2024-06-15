import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';


describe('App Component', () => {
  it('renders StateManagement component', () => {
    render(<App />);
    const stateManagementElement = screen.getByTestId('state-management');
    expect(stateManagementElement).toBeInTheDocument();
  });

  it('renders Planet component', () => {
    render(<App />);
    const planetElement = screen.getByTestId('planet');
    expect(planetElement).toBeInTheDocument();
  });
});
