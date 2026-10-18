# FRM Pocket v9 — private cross-device progress

Canonical app: https://frm-pocket-charaf.zgcharaf.chatgpt.site/ . Use the same ChatGPT account on each device. GitHub Pages remains a local/offline PWA with a migration link, because it cannot run this server. No account passwords, service credentials, PDFs or private progress are committed to either repository.

## Migration

1. Export JSON in Settings on the old GitHub app, on every device containing additional work.
2. Sign in to the private URL, then choose Import and merge. A copy before import is downloaded. Imports no longer replace the destination.
3. Wait for **Synchronisé**, then open the same private URL and account on the second device. The PWA can be installed on the home screen.
4. Wait for offline assets to finish downloading before relying on airplane mode. Work queues locally and uploads when the app is open and connected again.

Old snapshots may overlap and cannot reveal whether every historical counter is independent. Migration uses the maximum of overlapping counters and the number of identifiable distinct logged answers, rather than adding two unknown totals. New study after linking is merged by deltas and counted exactly once. Repeated imports of the same file do not add attempts. Unknown legacy first attempts remain unknown. Overlapping legacy practice without a fresh-evidence record invalidates an imported fresh claim conservatively. Completed-session histories and readiness samples are retained and deduplicated by their full immutable contents. Histories keep the existing bounded retention; they are not an unlimited archive.

## Data ownership and API

`GET /api/sync` and `POST /api/sync` resolve the visitor using Sites' server-only ChatGPT identity helper. Missing identity is 401, even for platform service access. Every SQL statement includes the stable per-Site user ID. Email/display name is shown only to that visitor and is not the database key. The Site remains owner-private.

Writes require the exact same Origin and JSON Content-Type, and cross-site requests are rejected. There is no cross-origin API or public shared write key. Responses use private/no-store. The service worker excludes `/api/`, sign-in, sign-out and callback routes. All authentication is owned by the hosting platform; the app does not implement passwords or OAuth callbacks.

D1 is provisioned through the retained project manifest. Schema-only migrations are generated and committed; request handlers never create tables. Progress JSON is split into bounded chunks. A revision compare-and-swap and writer nonce guard every chunk replacement in one transactional D1 batch, preventing partial snapshots and competing writes. A request is bounded to 16 MiB, an individual merged state to 7 MiB; capacity errors retain both the previous cloud snapshot and local work.

## Retry and merge protocol

Each browser has a stable random device ID and sequence. Before POST, IndexedDB durably records `{device, seq, base, local, mode}`. The cloud acknowledges each sequence once per user/device. Retrying a save whose response was lost cannot add counters twice. An interrupted local journal write prevents the HTTP write.

The server merges the local delta since its acknowledged base into the latest cloud revision. Quiz/card attempts, correct counts, lapses and daily counters add positive deltas. Schedules follow the latest observation, first-attempt evidence uses the earliest observation, and repairs from an older mistake are excluded when a newer mistake exists. Exposure timestamps, retention evidence, notes, declarations, history and bookmarks use field-specific merge rules. Repeated fresh claims for one question become one earliest evidence observation; offline devices cannot know about each other's unsent activity until they reconnect.

Independent field edits survive. For concurrent edits to the same scalar, the last synchronized edit wins. Conflicting note text is retained as both versions in Settings; import also downloads a prior copy and keeps conflicting text locally. It is a recoverable merge, not a collaborative text editor. Users can combine those copies into their current note. Capacity exhaustion leaves the previous cloud snapshot untouched.

Local work performed during an upload is rebased onto its response. A journaled commit includes before/after projections and a random recovery marker. The localStorage state retains that marker through all ordinary saves. If the app closes between committing the journal and updating localStorage, reopening applies the projection and retains later local edits. Existing localStorage remains the synchronous offline save path; IndexedDB holds the retry journal and pre-sync copy.

Web Locks give one tab ownership of a browser's journal. A second tab displays an explanation and cannot change progress; close the other tab and reload. Current Safari/Chrome/Firefox support this capability; if unavailable, the app explicitly retains local study without claiming cloud synchronization.

The client checks after edits, when online/focused/visible, and every 30 seconds while visible. A changed account blocks uploading local progress to that new account. No background synchronization is promised while the OS closes or suspends the app. Sessions, unsubmitted choices and timers remain device-owned. Remote exposure invalidates freshness for an unanswered local question; it never overwrites a local session or extends an assessment deadline. Imports are blocked during live assessments.

## Verification

- `tests/sync.mjs`: real SQLite transactions behind the D1-shaped interface; concurrent devices, same-question counters, lost-response retries, reopen recovery, writes during upload, crash between journal/projection, account isolation, migration, conflicts, settings, repairs, histories, same-origin security, bounded chunks and prototype keys.
- `tests/sync-ui.mjs`: full production browser scripts with simulated DOM/IndexedDB; status, settings, own/remote freshness, recovery-marker persistence, safe conflict display, merge import, local sessions, closed-book guard, GitHub migration and initial cloud trend loading.
- Existing content, readiness, roadmap, math and offline suites remain required.
- TypeScript and production Vinext build; schema applied successfully to local D1 through the supported migration CLI.
- Hosted publication and schema provisioning checked with native Sites tools. Physical iPhone/Safari UI, native sign-in and a real two-device session require signed-in use and cannot be claimed from these automated tests.
