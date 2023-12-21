import { relations } from "drizzle-orm";
import {
  sqliteTable,
  text,
  blob,
  integer,
  uniqueIndex,
  primaryKey,
} from "drizzle-orm/sqlite-core";

export const scopes = sqliteTable("scopes", {
  id: text("id").primaryKey().notNull(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
});

export const scopesRelations = relations(scopes, ({ many }) => ({
  clients: many(clients),
}));

export const scopeClients = sqliteTable(
  "scope_clients",
  {
    scopeId: text("scope_id")
      .notNull()
      .references(() => scopes.id),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id),
  },
  (t) => ({
    pk: primaryKey({
      name: "scope_clients_pk",
      columns: [t.scopeId, t.clientId],
    }),
  })
);

export const scopeClientsRelations = relations(scopeClients, ({ many }) => ({
  scope: many(scopes),
  client: many(clients),
}));

export const clients = sqliteTable("clients", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  redirect_uri: text("redirect_uri").notNull(),
  hashed_secret: blob("hashed_secret").notNull(),
  salt: blob("salt").notNull(),
});

export const clientsRelations = relations(clients, ({ many }) => ({
  users: many(users),
  userClients: many(userClients),
  scopes: many(scopes),
}));

export const authorizationCodes = sqliteTable(
  "authorization_codes",
  {
    id: text("id").primaryKey().notNull(),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id),
    code: text("code").notNull(),
    state: text("state").notNull(),
  },
  (t) => ({
    clientIdIdx: uniqueIndex("authorization_codes_client_id").on(t.clientId),
    codeIdx: uniqueIndex("authorization_codes_code").on(t.code),
  })
);

export const authorizationCodesRelations = relations(
  authorizationCodes,
  ({ many }) => ({
    client: many(clients),
  })
);

export const accessTokens = sqliteTable(
  "access_tokens",
  {
    id: text("id").primaryKey().notNull(),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id),
    accessToken: text("access_token").notNull(),
    expiresAt: integer("expires_at").notNull(),
  },
  (t) => ({
    clientIdIdx: uniqueIndex("access_tokens_client_id").on(t.clientId),
    accessTokenIdx: uniqueIndex("access_tokens_access_token").on(t.accessToken),
  })
);

export type TAccessTokens = typeof accessTokens.$inferInsert;

export const accessTokensRelations = relations(accessTokens, ({ many }) => ({
  client: many(clients),
}));

export const refreshTokens = sqliteTable("refresh_tokens", {
  id: text("id").primaryKey().notNull(),
  clientId: text("client_id")
    .notNull()
    .references(() => clients.id),
  refreshToken: text("refresh_token").notNull(),
  expiresAt: integer("expires_at").notNull(),
});

export const refreshTokensRelations = relations(refreshTokens, ({ many }) => ({
  client: many(clients),
}));

export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey().notNull(),
    username: text("username").notNull(),
    email: text("email").notNull(),
    hashed_password: blob("hashed_password").notNull(),
    salt: blob("salt").notNull(),
  },
  (t) => ({
    usernameIdx: uniqueIndex("users_username").on(t.username),
    emailIdx: uniqueIndex("users_email").on(t.email),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  clients: many(clients),
}));

export const userClients = sqliteTable(
  "user_clients",
  {
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    clientId: text("client_id")
      .notNull()
      .references(() => clients.id),
  },
  (t) => ({
    pk: primaryKey({
      name: "user_clients_pk",
      columns: [t.userId, t.clientId],
    }),
  })
);

export const userClientsRelations = relations(userClients, ({ many }) => ({
  user: many(users),
  client: many(clients),
}));

export type TClients = typeof clients.$inferInsert;
export type TAuthorizationCodes = typeof authorizationCodes.$inferInsert;
export type TRefreshTokens = typeof refreshTokens.$inferInsert;
export type TUsers = typeof users.$inferInsert;
export type TUserClients = typeof userClients.$inferInsert;
