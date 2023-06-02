import { useEffect, useState } from "react";

export function useElements(notes, todoLists){


    const [allElements, setElements] = useState([]);
    const [reversed, setReversed] = useState(false);
    const [colors, setColors] = useState(new Set());
    const [types, setTypes] = useState(new Set());

    useEffect(() => {
        const newNote = notes.map((note) => (  {type: 'note', ...note}  ))
        const newTodo = todoLists.map((todo) => ( {type: 'todo', ...todo}  ))
        let all = [...newNote, ...newTodo];
        all =  filterByColor(all);
        all = filterByType(all);
        all = sortByDate(all, reversed);
        setElements(all);
    }, [notes, todoLists, reversed, colors, types])


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

    function filterByColor(elems){
        if (colors.size === 0){
            return elems;
        }
        let filtered = elems.filter((el) => {
            return colors.has(el.color);
        })
        return filtered;
    }

    function filterByType(elems){
        if (types.size === 0){
            return elems;
        }
        let filtered = elems.filter((el) => {
            return types.has(el.type);
        })
        return filtered;
    }

        // Adding an item to the colors set
    const addColor = (color) => {
        setColors((prevColors) => new Set(prevColors.add(color)));
    };

    // Removing an item from the colors set
    const removeColor = (color) => {
        setColors((prevColors) => {
        const updatedColors = new Set(prevColors);
        updatedColors.delete(color);
        return updatedColors;
        });
    };

    // Adding an item to the types set
    const addType = (type) => {
        setTypes((prevTypes) => new Set(prevTypes.add(type)));
    };

    // Removing an item from the types set
    const removeType = (type) => {
        setTypes((prevTypes) => {
        const updatedTypes = new Set(prevTypes);
        updatedTypes.delete(type);
        return updatedTypes;
        });
    }


    return {allElements, reversed, setReversed, colors, types, addType, removeType, addColor, removeColor};
}