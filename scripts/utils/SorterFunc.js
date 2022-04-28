class SorterApiMedias {
    static async funcSorter(data, orderBy) {

        if (orderBy === 'date DESC') {
            const result = {
                key: orderBy,
                data: Array.from(data).sort((a, b) => Date(b.date) - Date(a.date))
            }
            console.log(result.data);
            return result;
        } else if (orderBy === 'likes DESC') {
            const result = {
                key: orderBy,
                data: Array.from(data).sort((a, b) => b.likes - a.likes)
            }
            console.log(result.data);
            return result;
        } else if (orderBy === 'title ASC') {
            const result = {
                key: orderBy,
                data: Array.from(data).sort((a, b) => a.title.localeCompare(b.title))
            }
            console.log(result.data);
            return result;
        } else {
            throw 'unknow orderBy type'
        }
    }
}