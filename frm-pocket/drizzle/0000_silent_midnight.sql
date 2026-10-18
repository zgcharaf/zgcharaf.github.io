CREATE TABLE `sync_accounts` (
	`user_id` text PRIMARY KEY NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`writer` text DEFAULT '' NOT NULL,
	`devices` text DEFAULT '{}' NOT NULL,
	`conflicts` text DEFAULT '[]' NOT NULL,
	`updated_at` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sync_chunks` (
	`user_id` text NOT NULL,
	`part` integer NOT NULL,
	`content` text NOT NULL,
	PRIMARY KEY(`user_id`, `part`)
);
