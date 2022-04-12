module.exports = {
    executeQuery(query) {
        console.error(`Can't execute ${JSON.stringify(query)}`);
    },

    buildQuery(filter) {
        return filter;
    },
};
