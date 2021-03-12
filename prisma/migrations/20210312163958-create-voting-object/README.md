# Migration `20210312163958-create-voting-object`

This migration has been generated at 3/12/2021, 10:39:58 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "votingobjects" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "wins" INTEGER NOT NULL DEFAULT 0,
    "losses" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20210312163958-create-voting-object
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,33 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+
+
+model votingobject {
+
+  id String @id
+
+  category String
+
+  label String
+
+  image String
+
+  rating Int
+
+  wins Int @default(0)
+
+  losses Int @default(0)
+
+  @@map(name: "votingobjects")
+}
+
```


