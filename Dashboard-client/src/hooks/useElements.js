import { useEffect, useState } from "react";

export default function useElements(elements){

    const [allElements, setElements] = useState(elements);

    useEffect(() => {
        let all = elements.flat();
        setElements(all);
    }, [...elements])


    function sortByDate(){
        let sorted = allElements.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        })
        setElements([...sorted]);
    }

    function sortByDateReverse(){
        let sorted = allElements.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        })
        setElements([...sorted]);
    }


    return {allElements, sortByDate, sortByDateReverse};
}