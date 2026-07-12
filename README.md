# Bluesky Unfollow Tool

> A simple toolkit for unfollowing Bluesky users, including **hidden followers** that don't always appear in the normal Bluesky interface.

---

## Features

* Unfollow everyone (`unfollow_all.js`)
* Unfollow only accounts from a custom handle list (`unfollow.js`)
* Extract handles from a SkeetBeaver follower export (`handle.js`)
* Fast, lightweight, and easy to use

---

# Installation

Install dependencies:

```bash
npm i
```

Then edit your username and app password inside the script:

```js
const USERNAME = "yourname.bsky.social";
const PASSWORD = "your-app-password";
```

---
## Option 1 > Normal Unfollow

> If all of your followers/following are visible normally, simply run:

```bash
node unfollow_all.js
```

## Option 2 > Hidden Followers / Missing Accounts

> Sometimes Bluesky doesn't show every account in your followers/following list.
If that's happening, follow these steps.

### Step 1 > Export your list
>Go to:
https://skeetbeaver.pages.dev/graph/followers
Enter your Bluesky username.
The website will generate a long CSV-like list that looks something like this:

```text
"252",,"did:plc:5pzufef4if7s47v7y7j27ysa","makithappen.bsky.social","2026-06-08T00:46:30.264Z","2026-06-11T21:07:14.161Z","Makit Happen","🇬🇦🔞 U","1","0","[]","0","0",...
```

Don't worry if it looks messy that's normal.

---

### Step 2 > Save the data

> Copy **everything** from the website.

Create a new file called:

```
new.txt
```

Paste the entire export into it.

---

### Step 3 > Extract only the handles

Run:

```bash
node handle.js
```

This will automatically create:

```
handles.txt
```

Example output:

```text
user1.bsky.social
user2.bsky.social
user3.bsky.social
...
```

---

### Step 4 > Unfollow only those accounts

Run:

```bash
node unfollow.js
```

The script will:

* Read `handles.txt`
* Compare it with the accounts you currently follow
* Unfollow only matching accounts
* Ignore everyone else

---

## Workflow

```
SkeetBeaver Export
        │
        ▼
     new.txt
        │
        ▼
 node handle.js
        │
        ▼
    handles.txt
        │
        ▼
 node unfollow.js
```

---

# Notes

* `unfollow_all.js` unfollows everyone.
* `unfollow.js` only unfollows users listed inside `handles.txt`.
* `handle.js` extracts the `handle` column from the SkeetBeaver export.
* A delay is included between requests to help avoid rate limits.

---
