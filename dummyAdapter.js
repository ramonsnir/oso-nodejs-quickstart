module.exports = {
    executeQuery(query) {
        console.error(`Can't execute ${JSON.stringify(query)}`);
        return [];
    },

    buildQuery(filter) {
        return filter;
    },
};
