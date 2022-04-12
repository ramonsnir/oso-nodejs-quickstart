class Repository {
    constructor(name, isPublic = false) {
        this.name = name;
        this.isPublic = isPublic;
    }

    static getByName(name) {
        return repos_db[name];
    }
}

class Role {
    constructor(name, repository) {
        this.name = name;
        this.repository = repository;
    }
}

class User {
    constructor(name, roles) {
        this.name = name;
        this.roles = roles;
    }

    static getCurrentUser() {
        return users_db["larry"];
    }
}

const repos_db = {
    gmail: new Repository("gmail"),
    react: new Repository("react", true),
    oso: new Repository("oso"),
};

const users_db = {
    larry: new User("larry", [new Role("admin", repos_db["gmail"])]),
    anne: new User("anne", [new Role("maintainer", repos_db["react"])]),
    graham: new User("graham", [new Role("contributor", repos_db["oso"])]),
};

module.exports = { Repository, User, users_db };
