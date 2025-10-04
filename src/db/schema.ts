import { pgTable, text, timestamp, boolean, uuid, integer } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    image: text("image"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const session = pgTable("session", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

export const verification = pgTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});


export const spaces = pgTable("spaces", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    spacename: text("spacename").notNull(),
    isShared: boolean("is_shared").default(false),
    spaceLogo: text("spacelogo"),
    headerTitle: text("header_title"),
    customMessage: text("custom_message"),

    // Custom questions
    question1: text("question1"),
    question2: text("question2"),
    question3: text("question3"),
    question4: text("question4"),
    question5: text("question5"),

    // Data collection toggles
    collectName: boolean("collect_name").default(true),
    collectEmail: boolean("collect_email").default(true),
    collectAddress: boolean("collect_address").default(false),
    collectTitle: boolean("collect_title").default(false),
    collectSocialLink: boolean("collect_social_link").default(false),
    collectStar: boolean("collect_star").default(false),

    // Branding
    theme: text("theme").notNull().default("light"),
    customBtnColor: text("custom_btn_color"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const testimonials = pgTable("testimonials", {
    id: uuid("id").defaultRandom().primaryKey(),
    spaceId: uuid("space_id")
        .notNull()
        .references(() => spaces.id, { onDelete: "cascade" }),

    // Approval / Sharing
    isApproved: boolean("is_approved").default(false),
    isShared: boolean("is_shared").default(false),

    // Owner response
    responseStars: integer("response_stars"),
    responseMessage: text("response_message"),
    responseName: text("response_name"),
    responseAddress: text("response_address"),
    responseEmail: text("response_email"),
    responseTitle: text("response_title"),
    responseSocialLink: text("response_sociallink"),


    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => new Date())
        .notNull(),
});

export const schema = { user, verification, account, spaces, testimonials, session }