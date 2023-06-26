// Importing the useEffect and useState hooks from React
import { useEffect, useState } from "react";

// Defining a custom hook called useElements that takes in two arrays of notes and todoLists
export function useElements(notes, todoLists){

    // Defining four state variables using the useState hook
    const [allElements, setElements] = useState([]); // An array of all the elements (notes and todoLists)

    const [reversed, setReversed] = useState(false); // A boolean indicating whether the elements should be sorted in reverse order

    const [colors, setColors] = useState(new Set()); // A Set of all the colors of the elements

    const [types, setTypes] = useState(new Set()); // A Set of all the types of the elements

    // Defining a useEffect hook that runs whenever the notes, todoLists, reversed, colors, or types state variables change
    useEffect(() => {
        // Creating a new array of notes with an added 'type' property of 'note'
        const newNote = notes.map((note) => (  {type: 'note', ...note}  ))

        // Creating a new array of todoLists with an added 'type' property of 'todo'
        const newTodo = todoLists.map((todo) => ( {type: 'todo', ...todo}  ))

        // Combining the two arrays into one
        let all = [...newNote, ...newTodo];

        // Filtering the array by color
        all =  filterByColor(all);

        // Filtering the array by type
        all = filterByType(all);

        // Sorting the array by date
        all = sortByDate(all, reversed);

        // Setting the allElements state variable to the sorted and filtered array
        setElements(all);
    }, [notes, todoLists, reversed, colors, types])


    // A function that sorts an array of elements by date
    function sortByDate(elems, reversed){
        let sorted;
        if (reversed){
            sorted = elems.sort((a, b) => {
                return new Date(a.createdAt) - new Date(b.createdAt);
            })
        } else {
            sorted = elems.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
            })
        }
        return sorted
    }

    // A function that filters an array of elements by color
    function filterByColor(elems){
        if (colors.size === 0){
            return elems;
        }
        let filtered = elems.filter((el) => {
            return colors.has(el.color);
        })
        return filtered;
    }

    // A function that filters an array of elements by type
    function filterByType(elems){
        if (types.size === 0){
            return elems;
        }
        let filtered = elems.filter((el) => {
            return types.has(el.type);
        })
        return filtered;
    }

    // A function that adds a color to the colors Set
    const addColor = (color) => {
        setColors((prevColors) => new Set(prevColors.add(color)));
    };

    // A function that removes a color from the colors Set
    const removeColor = (color) => {
        setColors((prevColors) => {
        const updatedColors = new Set(prevColors);
        updatedColors.delete(color);
        return updatedColors;
        });
    };

    // A function that adds a type to the types Set
    const addType = (type) => {
        setTypes((prevTypes) => new Set(prevTypes.add(type)));
    };

    // A function that removes a type from the types Set
    const removeType = (type) => {
        setTypes((prevTypes) => {
        const updatedTypes = new Set(prevTypes);
        updatedTypes.delete(type);
        return updatedTypes;
        });
    }

    // Returning an object containing all the state variables and functions
    return {allElements, reversed, setReversed, colors, types, addType, removeType, addColor, removeColor};
}