CREATE TABLE `attempts` (
	`key` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`until` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `codes` (
	`code` text PRIMARY KEY NOT NULL,
	`tier` text DEFAULT 'full' NOT NULL,
	`enabled` integer DEFAULT 1 NOT NULL,
	`uses` integer DEFAULT 0 NOT NULL,
	`created` integer NOT NULL,
	`last_used` integer
);
--> statement-breakpoint
CREATE TABLE `metrics` (
	`key` text PRIMARY KEY NOT NULL,
	`value` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`hash` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`code` text,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `sessions_code_idx` ON `sessions` (`code`);--> statement-breakpoint
CREATE INDEX `sessions_expiry_idx` ON `sessions` (`expires`);--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
