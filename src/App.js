import React, { useCallback, useRef, useState } from 'react';
import Card from './Card';
import Spinner from './Spinner';
import Alert from './Alert';
import useBookSearch from './useBookSearch';

function App() {
    const [query, setQuery] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const { books, hasMore, error, loading } = useBookSearch(query, pageNumber);

    const observer = useRef();
    const lastBookElementRef = useCallback(
        node => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && hasMore) {
                    // console.log('visible');
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
            console.log(node);
        },
        [loading, hasMore]
    );

    const handleSearch = e => {
        setQuery(e.target.value);
        setPageNumber(1);
    };
    return (
        <div className='container'>
            <div className='row'>
                <h1 className='text-center'>React Infinite scroll</h1>
                <input
                    type='text'
                    className='form-control mb-3'
                    onChange={handleSearch}
                    value={query}
                />
                {books.map((book, index) => {
                    if (books.length === index + 1) {
                        return (
                            <div
                                className='card'
                                key={book}
                                ref={lastBookElementRef}
                            >
                                <div className='card-body'>{book}</div>
                            </div>
                        );
                    } else {
                        return <Card key={book} body={book} />;
                    }
                })}
                {loading && <Spinner />}
                {error && <Alert msg='Error!' />}
            </div>
        </div>
    );
}

export default App;
