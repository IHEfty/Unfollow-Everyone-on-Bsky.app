const { BskyAgent } = require("@atproto/api");
const fs = require("fs");

const USERNAME = "you.bsky.social";
const PASSWORD = "pass";

const DELAY = 1500;
const HANDLE_FILE = "./handles.txt";

const agent = new BskyAgent({
    service: "https://bsky.social",
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function unfollowFromList() {
    try {
        console.log("Loading handles...");

        const handles = new Set(
            fs.readFileSync(HANDLE_FILE, "utf8")
                .split(/\r?\n/)
                .map(h => h.trim().toLowerCase())
                .filter(Boolean)
        );

        console.log(`Loaded ${handles.size} handles.`);

        console.log("🔑 Logging in...");

        await agent.login({
            identifier: USERNAME,
            password: PASSWORD,
        });

        console.log("✅ Logged in!");

        let total = 0;
        let cursor;

        while (true) {
            const { data } = await agent.getFollows({
                actor: USERNAME,
                limit: 100,
                cursor,
            });

            const follows = data.follows.filter(f =>
                f.viewer?.following &&
                handles.has(f.handle.toLowerCase())
            );

            if (follows.length === 0 && !data.cursor) {
                break;
            }

            console.log(`Found ${follows.length} matching account(s) in this page.`);

            for (const follow of follows) {
                console.log(`Waiting ${DELAY}ms...`);
                await sleep(DELAY);

                console.log(`Unfollowing ${follow.handle}...`);

                try {
                    await agent.deleteFollow(follow.viewer.following);

                    total++;
                    console.log(`✅ Success (${total})`);

                } catch (err) {
                    console.error("\n========================================");
                    console.error("❌ SERVER ERROR");
                    console.error(`User: ${follow.handle}`);
                    console.error(`Reason: ${err.message}`);

                    if (err.status) {
                        console.error(`HTTP Status: ${err.status}`);
                    }

                    console.error(`Already unfollowed: ${total}`);
                    process.exit(1);
                }
            }

            if (!data.cursor) break;
            cursor = data.cursor;
        }

        console.log("\n🎉 Finished!");
        console.log(`Total unfollowed: ${total}`);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

unfollowFromList();
