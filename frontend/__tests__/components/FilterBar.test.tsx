import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterBar from '@/components/FilterBar';
import { PropertyFilters } from '@/types/property';

describe('FilterBar', () => {
  const mockFilters: PropertyFilters = {
    page: 1,
    pageSize: 9,
    name: '',
    address: '',
    minPrice: undefined,
    maxPrice: undefined,
  };

  const mockOnChange = jest.fn();
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders all filter inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByLabelText('Nombre de Propiedad')).toBeInTheDocument();
    expect(screen.getByLabelText('Ubicación')).toBeInTheDocument();
    expect(screen.getByLabelText('Precio Mínimo')).toBeInTheDocument();
    expect(screen.getByLabelText('Precio Máximo')).toBeInTheDocument();
  });

  it('renders search and clear buttons', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByRole('button', { name: /buscar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /limpiar/i })).toBeInTheDocument();
  });

  it('calls onChange when name input changes', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    fireEvent.change(nameInput, { target: { value: 'Casa' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      name: 'Casa',
    });
  });

  it('calls onChange when address input changes', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const addressInput = screen.getByLabelText('Ubicación');
    fireEvent.change(addressInput, { target: { value: 'Bogotá' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      address: 'Bogotá',
    });
  });

  it('calls onChange when minPrice input changes', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '1000000' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 1000000,
    });
  });

  it('calls onChange when maxPrice input changes', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const maxPriceInput = screen.getByLabelText('Precio Máximo');
    fireEvent.change(maxPriceInput, { target: { value: '5000000' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      maxPrice: 5000000,
    });
  });

  it('calls onSearch when search button is clicked', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalled();
  });

  it('calls onClear when clear button is clicked', () => {
    const mockOnClear = jest.fn();
    
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed in name input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    
    // Simulate typing and then pressing Enter
    fireEvent.change(nameInput, { target: { value: 'Test Property' } });
    fireEvent.keyPress(nameInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed in address input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const addressInput = screen.getByLabelText('Ubicación');
    
    // Simulate typing and then pressing Enter
    fireEvent.change(addressInput, { target: { value: 'Bogotá' } });
    fireEvent.keyPress(addressInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed in minPrice input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    
    // Simulate typing and then pressing Enter
    fireEvent.change(minPriceInput, { target: { value: '1000000' } });
    fireEvent.keyPress(minPriceInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when Enter is pressed in maxPrice input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const maxPriceInput = screen.getByLabelText('Precio Máximo');
    
    // Simulate typing and then pressing Enter
    fireEvent.change(maxPriceInput, { target: { value: '5000000' } });
    fireEvent.keyPress(maxPriceInput, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });

  it('does not call onSearch when non-Enter keys are pressed', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    
    // Test various non-Enter keys
    fireEvent.keyPress(nameInput, { key: 'Space', code: 'Space', charCode: 32 });
    fireEvent.keyPress(nameInput, { key: 'Tab', code: 'Tab', charCode: 9 });
    fireEvent.keyPress(nameInput, { key: 'a', code: 'KeyA', charCode: 97 });

    expect(mockOnSearch).not.toHaveBeenCalled();
  });

  it('displays current filter values', () => {
    const filtersWithValues: PropertyFilters = {
      page: 1,
      pageSize: 9,
      name: 'Casa Test',
      address: 'Bogotá Test',
      minPrice: 1000000,
      maxPrice: 5000000,
    };

    render(
      <FilterBar
        filters={filtersWithValues}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByDisplayValue('Casa Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Bogotá Test')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1000000')).toBeInTheDocument();
    expect(screen.getByDisplayValue('5000000')).toBeInTheDocument();
  });

  it('handles empty price inputs correctly', () => {
    const filtersWithPrice: PropertyFilters = {
      ...mockFilters,
      minPrice: 1000000,
    };

    render(
      <FilterBar
        filters={filtersWithPrice}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...filtersWithPrice,
      minPrice: undefined,
    });
  });

  it('handles empty maxPrice input correctly', () => {
    const filtersWithPrice: PropertyFilters = {
      ...mockFilters,
      maxPrice: 5000000,
    };

    render(
      <FilterBar
        filters={filtersWithPrice}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const maxPriceInput = screen.getByLabelText('Precio Máximo');
    fireEvent.change(maxPriceInput, { target: { value: '' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...filtersWithPrice,
      maxPrice: undefined,
    });
  });

  it('handles zero values in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '0' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 0,
    });
  });

  it('handles decimal values in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '1234.56' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 1234.56,
    });
  });

  it('renders tune icon', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const tuneIcon = document.querySelector('svg');
    expect(tuneIcon).toBeTruthy();
  });

  it('has correct title', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    expect(screen.getByText('Filtros de Búsqueda')).toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked with timeout', () => {
    const mockOnClear = jest.fn();
    
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
        onClear={mockOnClear}
      />
    );

    const clearButton = screen.getByRole('button', { name: /limpiar/i });
    fireEvent.click(clearButton);

    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });

  it('handles special characters in name input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    fireEvent.change(nameInput, { target: { value: 'Casa "Luxury" & Villa' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      name: 'Casa "Luxury" & Villa',
    });
  });

  it('handles special characters in address input', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const addressInput = screen.getByLabelText('Ubicación');
    fireEvent.change(addressInput, { target: { value: 'Calle 123 #45-67, Bogotá' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      address: 'Calle 123 #45-67, Bogotá',
    });
  });

  it('handles very large numbers in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '999999999' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 999999999,
    });
  });

  it('maintains existing filter values when updating one field', () => {
    const existingFilters: PropertyFilters = {
      page: 1,
      pageSize: 9,
      name: 'Existing Name',
      address: 'Existing Address',
      minPrice: 1000000,
      maxPrice: 5000000,
    };

    render(
      <FilterBar
        filters={existingFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...existingFilters,
      name: 'Updated Name',
    });
  });

  it('renders search button with correct icon', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const searchButton = screen.getByRole('button', { name: /buscar/i });
    expect(searchButton).toBeInTheDocument();
    
    // Check that the button has the search icon
    const searchIcon = searchButton.querySelector('svg');
    expect(searchIcon).toBeTruthy();
  });

  it('has correct input types for price fields', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    const maxPriceInput = screen.getByLabelText('Precio Máximo');

    expect(minPriceInput).toHaveAttribute('type', 'number');
    expect(maxPriceInput).toHaveAttribute('type', 'number');
  });

  it('has correct input types for text fields', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    const addressInput = screen.getByLabelText('Ubicación');

    expect(nameInput).toHaveAttribute('type', 'text');
    expect(addressInput).toHaveAttribute('type', 'text');
  });

  it('handles undefined filter values correctly', () => {
    const filtersWithUndefined: PropertyFilters = {
      page: 1,
      pageSize: 9,
      name: undefined,
      address: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    };

    render(
      <FilterBar
        filters={filtersWithUndefined}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    const addressInput = screen.getByLabelText('Ubicación');
    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    const maxPriceInput = screen.getByLabelText('Precio Máximo');

    expect(nameInput).toHaveValue('');
    expect(addressInput).toHaveValue('');
    // For number inputs with undefined values, the value might be null or empty string
    expect(minPriceInput.value).toBe('');
    expect(maxPriceInput.value).toBe('');
  });

  it('handles null filter values correctly', () => {
    const filtersWithNull: PropertyFilters = {
      page: 1,
      pageSize: 9,
      name: null as any,
      address: null as any,
      minPrice: null as any,
      maxPrice: null as any,
    };

    render(
      <FilterBar
        filters={filtersWithNull}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    const addressInput = screen.getByLabelText('Ubicación');

    expect(nameInput).toHaveValue('');
    expect(addressInput).toHaveValue('');
  });

  it('handles very long input values', () => {
    const longString = 'A'.repeat(1000);
    
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    fireEvent.change(nameInput, { target: { value: longString } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      name: longString,
    });
  });

  it('handles negative numbers in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '-1000' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: -1000,
    });
  });

  it('handles zero values in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '0' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 0,
    });
  });

  it('handles string "0" in price inputs', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const minPriceInput = screen.getByLabelText('Precio Mínimo');
    fireEvent.change(minPriceInput, { target: { value: '0' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      minPrice: 0,
    });
  });

  it('handles whitespace-only values', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    fireEvent.change(nameInput, { target: { value: '   ' } });

    expect(mockOnChange).toHaveBeenCalledWith({
      ...mockFilters,
      name: '   ',
    });
  });

  it('renders with correct Paper styling', () => {
    const { container } = render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const paper = container.querySelector('.MuiPaper-root');
    expect(paper).toBeInTheDocument();
  });

  it('renders with correct grid layout', () => {
    const { container } = render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    // Check that the component renders without errors
    expect(container.firstChild).toBeInTheDocument();
  });

  it('handles multiple rapid filter changes', () => {
    render(
      <FilterBar
        filters={mockFilters}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );

    const nameInput = screen.getByLabelText('Nombre de Propiedad');
    
    fireEvent.change(nameInput, { target: { value: 'Casa' } });
    fireEvent.change(nameInput, { target: { value: 'Casa Villa' } });
    fireEvent.change(nameInput, { target: { value: 'Casa Villa Luxury' } });

    expect(mockOnChange).toHaveBeenCalledTimes(3);
    expect(mockOnChange).toHaveBeenLastCalledWith({
      ...mockFilters,
      name: 'Casa Villa Luxury',
    });
  });
});
