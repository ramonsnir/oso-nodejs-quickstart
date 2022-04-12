const { Oso, Relation, NotFoundError } = require("oso");
const { User, Role, Repository, users_db } = require("./models");
const express = require("express");
const dummyAdapter = require("./dummyAdapter");

async function start() {
    const oso = new Oso();
    oso.registerClass(User, {
        fields: {
            roles: new Relation("many", "Role", "id", "user_id"),
        }
    });
    oso.registerClass(Role, {
        fields: {
            repository: new Relation("one", "Repository", "repo_id", "id"),
        }
    });
    oso.registerClass(Repository);
    await oso.loadFiles(["main.polar"]);

    oso.setDataFilteringAdapter(dummyAdapter);

    console.log(JSON.stringify(await oso.authorizedQuery(users_db.larry, 'view', User)));

    // const app = express();

    // app.get("/repo/:name", async (req, res) => {
    //   const name = req.params.name;
    //   const repo = Repository.getByName(name);
    //   const user = User.getCurrentUser();

    //   try {
    //     await oso.authorize(user, "read", repo);
    //     res.send(`<h1>A Repo</h1><p>Welcome to repo ${repo.name}</p>`);
    //   } catch (e) {
    //     if (e instanceof NotFoundError) {
    //       res.status(404);
    //       res.send(`<h1>Whoops!</h1><p>Repo named ${name} was not found</p>`);
    //     } else {
    //       throw e;
    //     }
    //   }
    // });
    // app.listen(5000, () => console.log("Server running on port 5000"));
}

start();
