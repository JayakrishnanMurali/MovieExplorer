import { Search, SlidersHorizontal } from "lucide-react-native";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterPress?: () => void;
  onFocus?: () => void;
}

export interface SearchBarRef {
  focus: () => void;
}

const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({ onSearch, onFilterPress, onFocus }, ref) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const handleSearch = () => {
      onSearch(query);
    };

    return (
      <View style={styles.container}>
        <View style={styles.leftIcon}>
          {/* @ts-ignore */}
          <Search color="#bbb" stroke="#bbb" size={20} />
        </View>
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#888"
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            onSearch(text);
          }}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
          onFocus={onFocus}
        />
        <TouchableOpacity
          style={styles.filterBtn}
          onPress={onFilterPress}
          activeOpacity={0.8}
        >
          {/* @ts-ignore */}
          <SlidersHorizontal color="#fff" stroke="#fff" size={20} />
        </TouchableOpacity>
      </View>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232b",
    borderRadius: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    height: 48,
  },
  leftIcon: {
    marginLeft: 12,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    paddingVertical: 0,
    paddingLeft: 0,
    backgroundColor: "transparent",
  },
  filterBtn: {
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },
});
