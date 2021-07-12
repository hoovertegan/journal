export const setName = (userName) => {
    localStorage.setItem('username', userName);
}; 

export const getUserName = () => {
    return localStorage.getItem('username');
}

export const createNewEntry = (entry) => {
    let newEntry = {
        text: entry.text,
        date: entry.date ? entry.date : new Date(),
    };
    saveEntry(newEntry);
    return newEntry;
};

const saveEntry = (entry) => {
    localStorage.setItem('journal' + JSON.stringify(entry.date), JSON.stringify(entry)); 
}

export const getAllJournalEntriesfromDB = () =>{ 
    let entries = [];
    const keys = Object.keys(localStorage);
    keys.forEach( key =>{
        if(key.includes('journal')){
            let entry = JSON.parse(localStorage.getItem(key)); 
            entry.date = new Date(entry.date);
            entries.push(entry)
        }
    })  
    return entries;
}

export const getAllJournalEntries = () =>{
    let rawEntries = getAllJournalEntriesfromDB(); 
    let sortedEntries = [];
    // creates onjects that sort our entries by day
    rawEntries.forEach(entry =>{
        let index = sortedEntries.findIndex(item => item.day.toDateString() == entry.date.toDateString())
        if(index >= 0){
            sortedEntries[index].entries.push(entry)
        }else {
            let testDate = new Date(entry.date.getFullYear(), entry.date.getMonth(), entry.date.getDate());
            let newDay = {
                day: testDate,
                entries: [entry]
            }
            sortedEntries.push(newDay);
        }
    })
    // sorts the day objects to be in order
    sortedEntries.sort((a,b)=>{
        return a.day.valueOf() - b.day.valueOf();
    }).reverse();
    //sorts entries within a day by time 
    sortedEntries.forEach(day =>{
        day.entries.sort((a,b)=>{
            return a.date.valueOf() - b.date.valueOf();
        }).reverse();
    })
    return sortedEntries
}

export const deleteEntry = (key) => {
    localStorage.removeItem('journal' + JSON.stringify(key))
}


