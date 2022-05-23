import SearchBar from 'react-native-platform-searchbar';

const Search = () => {
    const [value, setValue] = useState('');
    <SearchBar
        value={value}
        onChangeText={setValue}
        placeholder="Search"
        theme="light"
        platform="ios"
        style={styles.searchBar}
    >
        {loading ? (
            <ActivityIndicator style={{ marginRight: 10 }} />
        ) : undefined}
    </SearchBar>;
};

export default Search;