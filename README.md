# Bluesky Unfollow All

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
> or
```bash
npm install @atproto/api csv-parser
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

### Step 1 > Export Your Following List

Go to:

> https://bskycheck.com/followstat.php

1. Enter your **Bluesky username**.
2. Wait for the page to finish loading your following list.
3. Select(Ctrl + A) everything on the page and copy(Ctrl + C) the entire page's text.
4. Paste it into a file named **`new.txt`**.

The copied text will look similar to this:

```text
Type
🆕
❌
Zai Sarel
Zai Sarel
@zaisarel.bsky.social
Followers
637
Following
1,439
Posts
3,405

Type
👤
❌
Zean Lain
Zean Lain
@zeanlain.bsky.social
Followers
2,757
Following
1,785
Posts
807

...
```

Next, run the **handle extractor** script. It will automatically:

* Extract every Bluesky handle (e.g. `@username.bsky.social`)
* Remove duplicate entries
* Ignore any handles listed in your exclusion list
* Save the results to **`handle.txt`**

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
