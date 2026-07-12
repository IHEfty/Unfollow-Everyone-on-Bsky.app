const { BskyAgent } = require("@atproto/api");

const USERNAME = "your.bsky.social";
const PASSWORD = "password";

const DELAY = 1500;

const agent = new BskyAgent({
    service: "https://bsky.social",
});

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function unfollowAll() {
    try {
        console.log("🔑 Logging in...");

        await agent.login({
            identifier: USERNAME,
            password: PASSWORD,
        });

        console.log("✅ Logged in!");

        let total = 0;

        while (true) {
            const { data } = await agent.getFollows({
                actor: USERNAME,
                limit: 100,
            });

            const follows = data.follows.filter(f => f.viewer?.following);

            if (follows.length === 0) {
                console.log("\n> Finished!🎉");
                console.log(`Total unfollowed: ${total}`);
                return;
            }

            console.log(`\nFound ${follows.length} accounts to unfollow...`);

            for (const follow of follows) {
                console.log(`> Waiting ${DELAY}ms...`);
                await sleep(DELAY);

                console.log(`> Unfollowing: ${follow.handle}`);

                try {
                    await agent.deleteFollow(follow.viewer.following);

                    total++;

                    console.log(`> Success✅`);
                    console.log(`> Total unfollowed: ${total}`);

                } catch (err) {
                    console.error("\n========================================");
                    console.error("❌ SERVER ERROR");
                    console.error(`User: ${follow.handle}`);
                    console.error(`Reason: ${err.message}`);

                    if (err.status) {
                        console.error(`HTTP Status: ${err.status}`);
                    }

                    console.error(`Already unfollowed: ${total}`);
                    console.error("🛑 Script stopped.");

                    process.exit(1);
                }
            }
        }

    } catch (err) {
        console.error("❌ Login failed.");
        console.error(err);
        process.exit(1);
    }
}

unfollowAll();
