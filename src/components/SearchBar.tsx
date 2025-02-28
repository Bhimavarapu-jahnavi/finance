'use client';

interface Props {
    onSearch: (search: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
    return (
        <input
            type="text"
            placeholder="Search cryptocurrencies..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
        />
    );
};

export default SearchBar;
