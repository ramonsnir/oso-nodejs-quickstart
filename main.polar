allow(actor, action, resource) if
  has_permission(actor, action, resource);

actor User {
  permissions = ["view", "edit"];
  roles = ["colleague", "self"];

  "colleague" if "self";

  "view" if "colleague";
  "edit" if "self";
}

has_role(actor: User, "self", user: User) if actor = user;

has_role(actor: User, "colleague", user: User) if
  actor_role in actor.roles and
  user_role in user.roles and
  actor_role.repository = user_role.repository;

resource Repository {
  permissions = ["read", "push", "delete"];
  roles = ["contributor", "maintainer", "admin"];

  "read" if "contributor";
  "push" if "maintainer";
  "delete" if "admin";

  "maintainer" if "admin";
  "contributor" if "maintainer";
}

# This rule tells Oso how to fetch roles for a user
has_role(actor: User, role_name: String, repository: Repository) if
  role in actor.roles and
  role_name = role.name and
  repository = role.repository;
