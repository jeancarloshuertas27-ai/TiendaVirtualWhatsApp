import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryPills } from '../../src/components/CategoryPills';

describe('CategoryPills Component', () => {
  it('renderiza las 5 categorías definidas en las especificaciones', () => {
    render(<CategoryPills activeCategory="Todos" onSelectCategory={() => {}} />);

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Audio')).toBeInTheDocument();
    expect(screen.getByText('Wearables')).toBeInTheDocument();
    expect(screen.getByText('Accesorios')).toBeInTheDocument();
    expect(screen.getByText('Hogar')).toBeInTheDocument();
  });

  it('resalta la categoría activa y permite seleccionar otra', () => {
    const handleSelect = vi.fn();
    render(<CategoryPills activeCategory="Audio" onSelectCategory={handleSelect} />);

    const audioBtn = screen.getByText('Audio');
    const wearablesBtn = screen.getByText('Wearables');

    expect(audioBtn).toHaveClass('bg-primary');
    expect(wearablesBtn).toHaveClass('bg-surface-container');

    fireEvent.click(wearablesBtn);
    expect(handleSelect).toHaveBeenCalledWith('Wearables');
  });
});

